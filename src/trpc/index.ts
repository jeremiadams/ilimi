import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { privateProcedure, publicProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { absoluteUrl } from '@/lib/utils'
import { getUserSubscriptionPlan, paystack } from '@/lib/paystack'

export const appRouter = router({
	authCallback: publicProcedure.query(async () => {
		const { getUser } = getKindeServerSession()
		const user = await getUser()

		//check if the user is in the Kinde database
		if (!user?.id || !user.email) throw new TRPCError({ code: 'UNAUTHORIZED' })

		//check if the user is in the database
		const dbUser = await db.user.findFirst({
			where: {
				id: user.id,
			},
		})

		if (!dbUser) {
			await db.user.create({
				data: {
					id: user.id,
					email: user.email,
				},
			})
		}

		return { success: true }
	}),
	getPathways: privateProcedure.query(async ({ ctx }) => {
		const { userId, user } = ctx

		return await db.pathway.findMany({
			where: {
				userId,
			},
			orderBy: [{ createdAt: 'desc' }],
			include: {
				Module: true,
			},
		})
	}),
	getRecentPathways: privateProcedure.query(async ({ ctx }) => {
		const { userId, user } = ctx

		return await db.pathway.findMany({
			where: {
				userId,
			},
			take: 2,
			orderBy: [{ createdAt: 'desc' }],
			include: {
				Module: true,
			},
		})
	}),
	markAsStarted: privateProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { userId, user } = ctx
			const { id } = input

			return await db.pathway.update({
				where: {
					id,
				},
				data: {
					pathwayStatus: 'PENDING',
				},
			})
		}),
	markSectionAsComplete: privateProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { userId, user } = ctx
			const { id } = input

			return await db.section.update({
				where: {
					id,
				},
				data: {
					pathwayStatus: 'COMPLETED',
				},
			})
		}),
	createPaystackSession: privateProcedure.mutation(async ({ ctx }) => {
		const { userId } = ctx

		const billingUrl = absoluteUrl('/dashboard/settings')

		if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })

		const dbUser = await db.user.findFirst({
			where: {
				id: userId,
			},
		})

		if (!dbUser) throw new TRPCError({ code: 'UNAUTHORIZED' })

		const subscriptionPlan = await getUserSubscriptionPlan()

		if (subscriptionPlan.isSubscribed && dbUser.paystackCustomerId) {
			return { url: absoluteUrl('/dashboard/settings') }
		}

		const paystackSession = await paystack.transaction.initialize({
			email: dbUser.email,
			amount: 950000,
			plan: process.env.PAYSTACK_PLAN_ID,
			metadata: {
				userId: userId,
			},
			callback_url: billingUrl,
		})

		return { url: paystackSession.data.authorization_url }
	}),
	saveQuiz: privateProcedure
		.input(
			z.object({
				quizId: z.string(),
				score: z.number(),
				questions: z.array(
					z.object({
						questionId: z.string(),
						options: z.array(
							z.object({
								id: z.string(),
								is_selected: z.boolean(),
							})
						),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await db.quiz.update({
				where: {
					id: input.quizId,
				},
				data: {
					isComplete: true,
					score: input.score,
					questions: {
						update: input.questions.map((question) => {
							return {
								where: { id: question.questionId },
								data: {
									options: {
										update: question.options.map((option) => {
											return {
												where: { id: option.id },
												data: {
													is_selected: option.is_selected,
												},
											}
										}),
									},
								},
							}
						}),
					},
				},
			})
		}),
})
export type AppRouter = typeof appRouter

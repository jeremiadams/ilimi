import { PLANS } from '@/config/paystack'
import { db } from '@/db'
import { openai } from '@/lib/openai'
import { getUserSubscriptionPlan } from '@/lib/paystack'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

export const maxDuration = 300

const Section = z.string()

const Module = z.object({
	title: z.string(),
	description: z.string(),
	sections: z.array(Section),
})

const CourseOutline = z.object({
	title: z.string(),
	description: z.string(),
	modules: z.array(Module),
})

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const subscriptionPlan = await getUserSubscriptionPlan()

	const pathwaysAmt = await db.pathway.findMany({
		where: {
			userId: user?.id,
		},
	})

	const isProExceeded =
		pathwaysAmt.length > PLANS.find((plan) => plan.name === 'Pro')!?.quota
	const isFreeExceeded =
		pathwaysAmt.length > PLANS.find((plan) => plan.name === 'Free')!?.quota

	if (!subscriptionPlan.isSubscribed && isFreeExceeded) {
		return NextResponse.json(
			{
				error:
					'Maximum amount of pathways generated for your current plan. Upgrade to PRO!',
			},
			{ status: 403 }
		)
	}

	const { message, difficulty } = SendMessageValidator.parse(body)

	let validateMessageFromOpenAI = await openai.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{
				role: 'system',
				content:
					"You're a teaching assistant and your job is to tell me if you can generate an intuitive course outline and lecture notes for any input i give you. Answer eiter yes or no.",
			},
			{
				role: 'user',
				content: `Can you generate a course for ${message}?`,
			},
		],
	})

	if (
		validateMessageFromOpenAI.choices[0].message.content
			?.toLowerCase()
			.includes('no')
	)
		return NextResponse.json(
			{
				error: `Cannot generate learning pathway for ${message}. Kindly input something more intuitive.`,
			},
			{ status: 400 }
		)

	const firstUserMessage = `Create a detailed course outline for the topic "${message}" ${
		difficulty !== 'No Preference' ? `suitable for ${difficulty}` : '.'
	} 
  Divide the course into modules, and sections and ensure the structure covers all necessary concepts. Titles of Modules should not contain the module number. The title of the course outline should be the title of the course.`

	const completion = await openai.beta.chat.completions.parse({
		model: 'gpt-4o',
		messages: [
			{
				role: 'user',
				content: firstUserMessage,
			},
		],
		response_format: zodResponseFormat(CourseOutline, 'course_outline'),
	})

	const course_outline = completion.choices[0].message

	if (course_outline.refusal) {
		return NextResponse.json({ error: course_outline.refusal }, { status: 400 })
	} else {
		const pathway = await db.pathway.create({
			data: {
				title: course_outline.parsed!.title,
				description: course_outline.parsed!.description,
				difficulty: difficulty,
				userId: user.id,
				Module: {
					create: course_outline.parsed?.modules.map((item) => {
						return {
							title: item.title,
							description: item.title,
							Section: {
								create: item.sections.map((item) => {
									return {
										title: item,
									}
								}),
							},
						}
					}),
				},
			},
		})

		await db.message.createMany({
			data: [
				{
					content: firstUserMessage,
					role: 'USER',
					pathwayId: pathway?.id,
					userId: user.id,
				},
				{
					content: JSON.stringify(course_outline.parsed),
					role: 'ASSISTANT',
					pathwayId: pathway?.id,
					userId: user.id,
				},
			],
		})

		return NextResponse.json(course_outline.parsed, { status: 200 })
	}
}

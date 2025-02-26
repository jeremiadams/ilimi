import { db } from '@/db'
import { openai } from '@/lib/openai'
import { GenerateQuizValidator } from '@/lib/validators/GenerateQuizValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { z } from 'zod'
import { CourseOutline } from '../createPathway/route'

export const maxDuration = 300

const questionTypeSchema = z.enum(['MULTIPLE_SELECT', 'MULTIPLE_CHOICE'])

const optionSchema = z.object({
	id: z.string(),
	text: z.string(),
	is_correct: z.boolean(),
})

const questionSchema = z.object({
	id: z.number(),
	type: questionTypeSchema,
	question: z.string(),
	options: z.array(optionSchema),
	explanation: z.string(),
})

const quizSchema = z.object({
	questions: z.array(questionSchema),
})

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { pathwayId, pathwayTitle, difficulty } =
		GenerateQuizValidator.parse(body)

	const pathway = await db.pathway.findFirst({
		where: {
			id: pathwayId,
			userId: user.id,
		},
	})

	if (!pathway)
		return NextResponse.json({ error: 'Not found' }, { status: 404 })

	const prevMessages = await db.message.findMany({
		where: {
			pathwayId,
		},
		take: 2,
		orderBy: {
			createdAt: 'asc',
		},
	})

	const formattedPrevMessages = prevMessages.map((msg) => ({
		role:
			msg.role === 'USER'
				? ('user' as const)
				: msg.role === 'ASSISTANT'
				? ('assistant' as const)
				: ('system' as const),
		content: msg.content,
	}))

	const prompt = `Create a quiz with about 17 to 30 questions on the course ${pathwayTitle} ${
		difficulty !== 'No Preference' ? `for ${difficulty}` : ':'
	}. The quiz should include: 
	1. Multiple-choice questions ( with single correct answers, true or false, e.t.c).
	2. Multiple-select questions ( with multiple correct answers )
	3. Include options for each question and indicate the correct answer(s).
	4. An explanation for each correct answer.`

	const completion = await openai.beta.chat.completions.parse({
		model: 'gpt-4o',
		messages: [
			...formattedPrevMessages,
			{
				role: 'user',
				content: prompt,
			},
		],
		response_format: zodResponseFormat(quizSchema, 'quizSchema'),
	})

	const quiz = completion.choices[0].message

	if (quiz.refusal) {
		return NextResponse.json({ error: quiz.refusal }, { status: 400 })
	} else {
		const newQuiz = await db.quiz.create({
			data: {
				questions: {
					create: quiz.parsed?.questions.map((item) => {
						return {
							type: item.type,
							question: item.question,
							options: {
								create: item.options.map((option) => {
									return {
										text: option.text,
										is_correct: option.is_correct,
									}
								}),
							},
							explanation: item.explanation,
						}
					}),
				},
				pathwayId,
			},
		})
		return NextResponse.json(
			{ quizId: newQuiz.id, questions: quiz.parsed },
			{ status: 200 }
		)
	}

	// if (
	// 	typeof response.choices[0].message.function_call?.arguments === 'string' &&
	// 	typeof JSON.parse(response.choices[0].message.function_call?.arguments) ===
	// 		'object'
	// ) {
	// 	const quizContent = JSON.parse(
	// 		response.choices[0].message.function_call?.arguments
	// 	)

	// 	return NextResponse.json(quizContent, { status: 200 })
	// } else {
	// 	return NextResponse.json(
	// 		{ error: 'Error generating quiz' },
	// 		{ status: 400 }
	// 	)
	// }
}

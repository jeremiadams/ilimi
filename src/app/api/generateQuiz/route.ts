import { db } from '@/db'
import { openai } from '@/lib/openai'
import { GenerateQuizValidator } from '@/lib/validators/GenerateQuizValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { pathwayId, pathwayTitle } = GenerateQuizValidator.parse(body)

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

	let response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content:
					"You're a teaching assistant and your job is to teach users by helping them generate multi choice questions and answers for courses already created.",
			},
			{
				role: 'user',
				content: `Generate a quiz with a maximum of 20 questions for the course: ${pathwayTitle}. Use the following pieces of information (which is in a stringified JSON format ) for context on the course modules for ${pathwayTitle} that have already been generated:

	            \n----------------\n

	            CONTEXT:
	            ${formattedPrevMessages.map((message) => {
								if (message.role === 'user') return `User: ${message.content}\n`
								return `Assistant: ${message.content}\n`
							})}
	            `,
			},
		],
		functions: [
			{
				name: 'generateQuiz',
				description: 'Generate a quiz for a course ',
				parameters: {
					type: 'object',
					properties: {
						questionsAndAnswers: {
							type: 'array',
							description:
								'An array of questions consisting of objects that have a question and an array of answers',
							items: {
								type: 'object',
								properties: {
									question: {
										type: 'string',
										description: 'The question',
									},
									answers: {
										type: 'array',
										description:
											'An array of answers consisting of objects that have one correct answer and other wrong answers',
										items: {
											type: 'object',
											properties: {
												answer: {
													type: 'string',
													description: 'An answer to the question.',
												},
												isCorrect: {
													type: 'boolean',
													description:
														'A boolean to describe if the answer is true or false',
												},
											},
										},
									},
								},
							},
						},
					},
					required: ['questionsAndAnswers'],
				},
			},
		],
		function_call: { name: 'generateQuiz' },
	})

	if (
		typeof response.choices[0].message.function_call?.arguments === 'string' &&
		typeof JSON.parse(response.choices[0].message.function_call?.arguments) ===
			'object'
	) {
		const quizContent = JSON.parse(
			response.choices[0].message.function_call?.arguments
		)

		return NextResponse.json(quizContent, { status: 200 })
	} else {
		return NextResponse.json(
			{ error: 'Error generating quiz' },
			{ status: 400 }
		)
	}
}

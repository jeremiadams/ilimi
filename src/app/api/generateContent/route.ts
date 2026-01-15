import { db } from '@/db'
import { openai } from '@/lib/openai'
import { GenerateContentValidator } from '@/lib/validators/GenerateContentValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

export const maxDuration = 300

const CourseContent = z.object({
	content: z.string(),
})

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const {
		sectionId,
		pathwayId,
		moduleNumber,
		moduleTitle,
		sectionTitle,
		moduleId,
		difficulty,
	} = GenerateContentValidator.parse(body)

	const pathway = await db.pathway.findFirst({
		where: {
			id: pathwayId,
			userId: user.id,
		},
	})

	if (!pathway)
		return NextResponse.json({ error: 'Not found' }, { status: 404 })

	const singleModule = await db.module.findFirst({
		where: {
			id: moduleId,
		},
	})

	if (!singleModule)
		return NextResponse.json({ error: 'Module Not found' }, { status: 404 })

	const singleSection = await db.section.findFirst({
		where: {
			id: sectionId,
		},
	})

	if (singleSection?.content)
		return NextResponse.json(
			{ alreadyGenerated: true, sectionId },
			{ status: 200 }
		)

	const prevMessages = await db.message.findMany({
		where: {
			pathwayId,
		},
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

	const newMessages = [...formattedPrevMessages]

	// Refinement Functions
	// const generateInitialContent = async () => {
	// 	const prompt = `Write an introduction to the topic "${sectionTitle}" under module "${moduleNumber}": "${moduleTitle}" ${
	// 		difficulty !== 'No Preference' ? `suitable for ${difficulty}` : '.'
	// 	} Include examples and real-world applications.`
	// 	newMessages.push({
	// 		role: 'user',
	// 		content: prompt,
	// 	})
	// 	const response = await openai.beta.chat.completions.parse({
	// 		model: 'gpt-4o',
	// 		messages: newMessages,
	// 		// max_tokens: 500,
	// 		response_format: zodResponseFormat(CourseContent, 'content'),
	// 	})

	// 	const course_content = response.choices[0].message
	// 	if (course_content.refusal) {
	// 		return NextResponse.json(
	// 			{ error: course_content.refusal },
	// 			{ status: 400 }
	// 		)
	// 	} else {
	// 		return course_content.parsed?.content
	// 	}
	// }

	// const refineContent = async (draft: any) => {
	// 	const prompt = `The following draft was written about topic "${sectionTitle}" under module "${moduleNumber}": "${moduleTitle}" ${
	// 		difficulty !== 'No Preference' ? `for ${difficulty}` : ':'
	// 	}
	// 	${draft}
	// 	Expand on the draft with more examples, detailed explanations, and applications. Address potential misconceptions where necessary.`
	// 	newMessages.push({
	// 		role: 'user',
	// 		content: prompt,
	// 	})
	// 	const response = await openai.beta.chat.completions.parse({
	// 		model: 'gpt-4o',
	// 		messages: newMessages,
	// 		// max_tokens: 500,
	// 		response_format: zodResponseFormat(CourseContent, 'content'),
	// 	})

	// 	const course_content = response.choices[0].message
	// 	if (course_content.refusal) {
	// 		return NextResponse.json(
	// 			{ error: course_content.refusal },
	// 			{ status: 400 }
	// 		)
	// 	} else {
	// 		return course_content.parsed?.content
	// 	}
	// }

	// const evaluateContent = async (content: any) => {
	// const prompt = `Review the following content about topic "${sectionTitle}" under module "${moduleNumber}": "${moduleTitle}":
	// ${content}
	// Identify if there's any missing key points, improvements, and unclear sections. Add that to the content and give me a final draft strictly in markdown format. Theres no need to start the draft by labelling it final draft and theres no need to give me back the module name and section title again, just go straight ahead into the content of the course. `
	// 	newMessages.push({
	// 		role: 'user',
	// 		content: prompt,
	// 	})
	// 	const response = await openai.beta.chat.completions.parse({
	// 		model: 'gpt-4o',
	// 		messages: newMessages,
	// 		// max_tokens: 700,
	// 		response_format: zodResponseFormat(CourseContent, 'content'),
	// 	})

	// 	const course_content = response.choices[0].message
	// 	if (course_content.refusal) {
	// 		return NextResponse.json(
	// 			{ error: course_content.refusal },
	// 			{ status: 400 }
	// 		)
	// 	} else {
	// 		return course_content.parsed?.content
	// 	}
	// }

	// const refineContentLoop = async () => {
	// 	const initialContent = await generateInitialContent()
	// 	const refinedContent = await refineContent(initialContent)
	// 	const evaluatedContent = await evaluateContent(refinedContent)

	// 	// for (let i = 0; i < iterations; i++) {
	// 	// 	const feedback = await evaluateContent(content, topic)
	// 	// 	content = await refineContent(content, topic, audience)
	// 	// }
	// 	return evaluatedContent
	// }

	const evaluateContent = async (
		input: string,
		controller: ReadableStreamDefaultController
	) => {
		const prompt = `Review the following content about topic "${sectionTitle}" under module "${moduleNumber}": "${moduleTitle}":
			${input}
			
			Identify if there's any missing key points, improvements, and unclear sections. Add that to the content and give me a final draft strictly in markdown format. Theres no need to start the draft by labelling it final draft and theres no need to give me back the module name and section title again, just go straight ahead into the content of the course. `
		newMessages.push({
			role: 'user',
			content: prompt,
		})

		const stream = openai.beta.chat.completions.stream({
			model: 'gpt-4o',
			messages: newMessages,
			// max_tokens: 500,
			response_format: zodResponseFormat(CourseContent, 'content'),
		})
		let lastSnapshot = ''

		stream.on('content.delta', ({ snapshot }) => {
			// const chunk = JSON.stringify({ content: snapshot })
			// controller.enqueue(new TextEncoder().encode(`${chunk}\n`))

			const newContent = snapshot.replace(lastSnapshot, '')
			lastSnapshot = snapshot

			if (newContent.trim()) {
				const chunk = JSON.stringify({ streamId: 3, content: newContent })
				controller.enqueue(new TextEncoder().encode(`${chunk}\n`))
			}
		})

		stream.on('content.done', async (props) => {
			try {
				if (!props.parsed?.content) {
					throw new Error('Failed to evaluate content')
				}
				await db.section.update({
					where: {
						id: sectionId,
						moduleId,
					},
					data: {
						content: props.parsed.content,
						pathwayStatus: 'PENDING',
					},
				})
				await db.message.createMany({
					data: [
						...newMessages.map((item) => {
							return {
								role:
									item.role === 'user'
										? ('USER' as const)
										: item.role === 'assistant'
										? ('ASSISTANT' as const)
										: ('SYSTEM' as const),
								content: item.content,
								sectionId,
								userId: user.id,
							}
						}),
						{
							role: 'ASSISTANT',
							content: props.parsed.content,
							sectionId,
							userId: user.id,
						},
					],
				})
				controller.close()
			} catch (err) {
				console.error('Error in evaluate content.done:', err)
				controller.error(err)
			}
		})

		stream.on('error', (err) => {
			console.error('Second stream error:', err)
			controller.error(err)
		})
	}

	const refineContent = async (
		input: string,
		controller: ReadableStreamDefaultController
	) => {
		const prompt = `The following draft was written about topic "${sectionTitle}" under module "${moduleNumber}": "${moduleTitle}" ${
			difficulty !== 'No Preference' ? `for ${difficulty}` : ':'
		}
		${input}
		Expand on the draft with more examples, detailed explanations, and applications. Address potential misconceptions where necessary.`
		newMessages.push({
			role: 'user',
			content: prompt,
		})

		const stream = openai.beta.chat.completions.stream({
			model: 'gpt-4o',
			messages: newMessages,
			// max_tokens: 500,
			response_format: zodResponseFormat(CourseContent, 'content'),
		})
		let lastSnapshot = ''

		stream.on('content.delta', ({ snapshot }) => {
			// const chunk = JSON.stringify({ content: snapshot })
			// controller.enqueue(new TextEncoder().encode(`${chunk}\n`))

			const newContent = snapshot.replace(lastSnapshot, '')
			lastSnapshot = snapshot

			if (newContent.trim()) {
				const chunk = JSON.stringify({ streamId: 2, content: newContent })
				controller.enqueue(new TextEncoder().encode(`${chunk}\n`))
			}
		})

		stream.on('content.done', async (props) => {
			try {
				if (!props.parsed?.content) {
					throw new Error('Failed to refine content')
				}
				await evaluateContent(props.parsed.content, controller)
			} catch (err) {
				console.error('Error in refine content.done:', err)
				controller.error(err)
			}
		})

		stream.on('error', (err) => {
			console.error('Second stream error:', err)
			controller.error(err)
		})
	}

	try {
		// Refinement logic
		// const content = await refineContentLoop()

		// Send response back to the frontend
		// if (typeof content === 'string') {
		// 	await db.section.update({
		// 		where: {
		// 			id: sectionId,
		// 			moduleId,
		// 		},
		// 		data: {
		// 			content: content,
		// 			pathwayStatus: 'PENDING',
		// 		},
		// 	})

		// 	await db.message.createMany({
		// 		data: [
		// 			...newMessages.map((item) => {
		// 				return {
		// 					role:
		// 						item.role === 'user'
		// 							? ('USER' as const)
		// 							: item.role === 'assistant'
		// 							? ('ASSISTANT' as const)
		// 							: ('SYSTEM' as const),
		// 					content: item.content,
		// 					sectionId,
		// 					userId: user.id,
		// 				}
		// 			}),
		// 			{
		// 				role: 'ASSISTANT',
		// 				content: content,
		// 				sectionId,
		// 				userId: user.id,
		// 			},
		// 		],
		// 	})
		// 	return NextResponse.json({ content }, { status: 200 })
		// }
		const prompt = `Write an introduction to the topic "${sectionTitle}" under module "${moduleNumber}": "${moduleTitle}" ${
			difficulty !== 'No Preference' ? `suitable for ${difficulty}` : '.'
		} Include examples and real-world applications.`
		newMessages.push({
			role: 'user',
			content: prompt,
		})

		const stream = openai.beta.chat.completions.stream({
			model: 'gpt-4o',
			messages: newMessages,
			// max_tokens: 500,
			response_format: zodResponseFormat(CourseContent, 'content'),
		})

		const encoder = new TextEncoder()
		let lastSnapshot = ''
		const readableStream = new ReadableStream({
			start(controller) {
				stream
					.on('content.delta', ({ snapshot, parsed }) => {
						const newContent = snapshot.replace(lastSnapshot, '')
						lastSnapshot = snapshot

						if (newContent.trim()) {
							const chunk = JSON.stringify({ streamId: 1, content: newContent })
							controller.enqueue(encoder.encode(`${chunk}\n`))
						}
					})
					.on('content.done', async (props) => {
						try {
							if (!props.parsed?.content) {
								throw new Error('Failed to generate initial content')
							}
							await refineContent(props.parsed.content, controller)
						} catch (err) {
							console.error('Error in content.done:', err)
							controller.error(err)
						}
					})
					.on('error', (err) => {
						console.error('Stream error:', err)
						controller.error(err)
					})
			},
		})

		return new NextResponse(readableStream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			},
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json('Error generating content', { status: 500 })
	}

	// let response = await openai.chat.completions.create({
	// 	model: 'gpt-4-turbo',
	// 	messages: [
	// 		{
	// 			role: 'system',
	// 			content: `
	// 				 You are a teacher and your job is to create detailed lecture notes for any module given by a user. Ensure all concepts are explained in detail and not just listed out. Include links where necessary (functional links not generic or placeholder links). Do not inlude quizzes or exercises at this point.
	// 				`,
	// 		},
	// 		{
	// 			role: 'user',
	// 			content: `Create a course content for module ${moduleNumber}: ${moduleTitle} strictly in markdown format. Use the following pieces of information (which is in a stringified JSON format ) for context on past messages:

	//             \n----------------\n

	//             CONTEXT:
	//             ${formattedPrevMessages.map((message) => {
	// 								if (message.role === 'user')
	// 									return `User: ${message.content}\n`
	// 								return `Assistant: ${message.content}\n`
	// 							})}
	//             `,
	// 		},
	// 	],
	// 	functions: [
	// 		{
	// 			name: 'createContent',
	// 			description: 'Create course content for a module ',
	// 			parameters: {
	// 				type: 'object',
	// 				properties: {
	// 					courseContent: {
	// 						type: 'string',
	// 						description:
	// 							'The detailed course content of a module, strictly in markdown format',
	// 					},
	// 				},
	// 				required: ['courseContent'],
	// 			},
	// 		},
	// 	],
	// 	temperature: 1,
	// 	max_tokens: 2048,
	// 	function_call: { name: 'createContent' },
	// })

	// if (
	// 	typeof response.choices[0].message.function_call?.arguments === 'string' &&
	// 	typeof JSON.parse(response.choices[0].message.function_call?.arguments) ===
	// 		'object'
	// ) {
	// 	const courseContentObj = JSON.parse(
	// 		response.choices[0].message.function_call?.arguments
	// 	)

	// 	await db.module.update({
	// 		where: {
	// 			id: moduleId,
	// 		},
	// 		data: {
	// 			content: courseContentObj.courseContent,
	// 			pathwayStatus: 'PENDING',
	// 		},
	// 	})

	// 	await db.message.create({
	// 		data: {
	// 			text:
	// 				typeof response.choices[0].message.function_call?.arguments ===
	// 				'string'
	// 					? response.choices[0].message.function_call?.arguments
	// 					: JSON.stringify(
	// 							response.choices[0].message.function_call?.arguments
	// 					  ),
	// 			isUserMessage: true,
	// 			pathwayId,
	// 			userId: user.id,
	// 		},
	// 	})

	// 	return NextResponse.json(response, { status: 200 })
	// } else {
	// 	return NextResponse.json(
	// 		{ error: 'Cannot generate content' },
	// 		{ status: 400 }
	// 	)
	// }
}

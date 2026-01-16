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

	try {
		const prompt = `You are an expert educator creating comprehensive course content. Generate detailed educational content for the topic "${sectionTitle}" under Module ${moduleNumber}: "${moduleTitle}"${
			difficulty !== 'No Preference' ? ` suitable for ${difficulty}` : ''
		}.

Your content MUST include:

1. **Clear Introduction**: Start with a compelling overview that explains why this topic matters and what learners will gain.

2. **Core Concepts**: Explain all fundamental concepts in detail. Don't just list them - provide thorough explanations with context.

3. **Practical Examples**: Include 2-3 real-world examples that demonstrate how these concepts apply in practice.

4. **Common Misconceptions**: Address typical misunderstandings learners might have.

5. **Key Takeaways**: End with a summary of the most important points.

Requirements:
- Use markdown formatting throughout
- Be thorough and educational - this is the primary learning material
- Don't include quizzes or exercises
- Don't repeat the module name or section title at the start
- Go directly into the content`

		newMessages.push({
			role: 'user',
			content: prompt,
		})

		const stream = openai.chat.completions.stream({
			model: 'gpt-5-nano',
			messages: newMessages,
			response_format: zodResponseFormat(CourseContent, 'content'),
		})

		const encoder = new TextEncoder()
		let lastSnapshot = ''

		const readableStream = new ReadableStream({
			start(controller) {
				stream
					.on('content.delta', ({ snapshot }) => {
						const newContent = snapshot.replace(lastSnapshot, '')
						lastSnapshot = snapshot

						if (newContent.trim()) {
							const chunk = JSON.stringify({ content: newContent })
							controller.enqueue(encoder.encode(`${chunk}\n`))
						}
					})
					.on('content.done', async (props) => {
						try {
							if (!props.parsed?.content) {
								throw new Error('Failed to generate content')
							}

							const finalContent = props.parsed.content

							// Save content to database
							await db.section.update({
								where: {
									id: sectionId,
									moduleId,
								},
								data: {
									content: finalContent,
									pathwayStatus: 'PENDING',
								},
							})

							// Save messages for context
							await db.message.createMany({
								data: [
									{
										role: 'USER',
										content: prompt,
										sectionId,
										userId: user.id,
									},
									{
										role: 'ASSISTANT',
										content: finalContent,
										sectionId,
										userId: user.id,
									},
								],
							})

							// Signal completion
							const doneChunk = JSON.stringify({ done: true })
							controller.enqueue(encoder.encode(`${doneChunk}\n`))
							controller.close()
						} catch (err) {
							console.error('Error in content.done:', err)
							const errorChunk = JSON.stringify({
								error: 'Failed to save content',
							})
							controller.enqueue(encoder.encode(`${errorChunk}\n`))
							controller.close()
						}
					})
					.on('error', (err) => {
						console.error('Stream error:', err)
						const errorChunk = JSON.stringify({
							error: 'Stream error occurred',
						})
						controller.enqueue(encoder.encode(`${errorChunk}\n`))
						controller.close()
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
		return NextResponse.json(
			{ error: 'Error generating content' },
			{ status: 500 }
		)
	}
}

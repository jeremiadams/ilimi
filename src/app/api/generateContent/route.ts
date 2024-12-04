import { db } from '@/db'
import { openai } from '@/lib/openai'
import { GenerateContentValidator } from '@/lib/validators/GenerateContentValidator'
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

	const { moduleId, pathwayId, moduleNumber, moduleTitle } =
		GenerateContentValidator.parse(body)

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

	if (singleModule?.content)
		return NextResponse.json('Successfully fetched content', { status: 200 })

	const prevMessages = await db.message.findMany({
		where: {
			pathwayId,
		},
		orderBy: {
			createdAt: 'asc',
		},
	})

	const formattedPrevMessages = prevMessages.map((msg) => ({
		role: msg.isUserMessage ? ('user' as const) : ('assistant' as const),
		content: msg.text,
	}))

	let response = await openai.chat.completions.create({
		model: 'gpt-4-turbo',
		messages: [
			{
				role: 'system',
				content: `
					 You are a teacher and your job is to create detailed lecture notes for any module given by a user. Ensure all concepts are explained in detail and not just listed out. Include links where necessary (functional links not generic or placeholder links). Do not inlude quizzes or exercises at this point.
					`,
			},
			{
				role: 'user',
				content: `Create a course content for module ${moduleNumber}: ${moduleTitle} strictly in markdown format. Use the following pieces of information (which is in a stringified JSON format ) for context on past messages:

                \n----------------\n

                CONTEXT: 
                ${formattedPrevMessages.map((message) => {
									if (message.role === 'user')
										return `User: ${message.content}\n`
									return `Assistant: ${message.content}\n`
								})}
                `,
			},
		],
		functions: [
			{
				name: 'createContent',
				description: 'Create course content for a module ',
				parameters: {
					type: 'object',
					properties: {
						courseContent: {
							type: 'string',
							description:
								'The detailed course content of a module, strictly in markdown format',
						},
					},
					required: ['courseContent'],
				},
			},
		],
		temperature: 1,
		max_tokens: 2048,
		function_call: { name: 'createContent' },
	})

	if (
		typeof response.choices[0].message.function_call?.arguments === 'string' &&
		typeof JSON.parse(response.choices[0].message.function_call?.arguments) ===
			'object'
	) {
		const courseContentObj = JSON.parse(
			response.choices[0].message.function_call?.arguments
		)

		await db.module.update({
			where: {
				id: moduleId,
			},
			data: {
				content: courseContentObj.courseContent,
				pathwayStatus: 'PENDING',
			},
		})

		await db.message.create({
			data: {
				text:
					typeof response.choices[0].message.function_call?.arguments ===
					'string'
						? response.choices[0].message.function_call?.arguments
						: JSON.stringify(
								response.choices[0].message.function_call?.arguments
						  ),
				isUserMessage: true,
				pathwayId,
				userId: user.id,
			},
		})

		return NextResponse.json(response, { status: 200 })
	} else {
		return NextResponse.json(
			{ error: 'Cannot generate content' },
			{ status: 400 }
		)
	}
}

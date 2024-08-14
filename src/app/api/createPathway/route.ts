import { db } from '@/db'
import { openai } from '@/lib/openai'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	const { message } = SendMessageValidator.parse(body)

	const firstUserMessage = `Create a course outline for ${message}. The course outline should be classified into modules and each module should contain a title and description.`

	let response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content:
					"You're a teaching assistant and your job is to help users generate courses depending on the user request",
			},
			{
				role: 'user',
				content: firstUserMessage,
			},
		],
		functions: [
			{
				name: 'createCourseOutline',
				description: 'Create a course outline for the user',
				parameters: {
					type: 'object',
					properties: {
						title: {
							type: 'string',
							description: 'The title of the course the user wants to generate',
						},
						description: {
							type: 'string',
							description: 'An overview of what the course is about',
						},
						modules: {
							type: 'array',
							description:
								'An array of modules in the course outline consisting of objects that have a title and a description for each module',
							items: {
								type: 'object',
								properties: {
									title: {
										type: 'string',
										description:
											'The title of a module. Just the title text, ensure not to include what module number it is',
									},
									description: {
										type: 'string',
									},
								},
							},
						},
					},
					required: ['title', 'description', 'modules'],
				},
			},
		],
		function_call: { name: 'createCourseOutline' },
	})

	if (
		typeof response.choices[0].message.function_call?.arguments === 'string' &&
		typeof JSON.parse(response.choices[0].message.function_call?.arguments) ===
			'object'
	) {
		const pathwayObj = JSON.parse(
			response.choices[0].message.function_call?.arguments
		)
		const pathway = await db.pathway.create({
			data: {
				title: pathwayObj.title,
				description: pathwayObj.description,
				userId: user.id,
				Module: {
					createMany: {
						data: pathwayObj?.modules,
					},
				},
			},
		})

		await db.message.createMany({
			data: [
				{
					text: firstUserMessage,
					isUserMessage: true,
					pathwayId: pathway?.id,
					userId: user.id,
				},
				{
					text:
						typeof response.choices[0].message.function_call?.arguments ===
						'string'
							? response.choices[0].message.function_call?.arguments
							: JSON.stringify(
									response.choices[0].message.function_call?.arguments
							  ),
					isUserMessage: false,
					pathwayId: pathway?.id,
					userId: user.id,
				},
			],
		})

		return NextResponse.json({ pathway }, { status: 200 })
	} else {
		return new Response('Cannot generate pathway', { status: 400 })
	}
}

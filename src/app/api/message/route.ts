import { db } from '@/db'
import { openai } from '@/lib/openai'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	const { message } = SendMessageValidator.parse(body)

	// await db.message.create({
	//     data: {
	//         text: message,
	//         isUserMessage: true,
	//         userId: user.id
	//     },

	// })
	let response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content:
					"You're a teaching assistant and your job is to help users generate courses, course outlines classified in modules and quizzes depending on the user request",
			},
			{
				role: 'user',
				content: `Create a course outline for ${message}. The course outline should be classified into modules and each module should contain a title and description.`,
			},
		],
		functions: [
			{
				name: 'createCourseOutline',
				description: 'Create a course outline for the user',
				parameters: {
					type: 'object',
					properties: {
						modules: {
							type: 'array',
							description:
								'An array of modules in the course outline consisting of objects that have a title and a description for each module',
							items: {
								type: 'object',
								properties: {
									title: {
										type: 'string',
									},
									description: {
										type: 'string',
									},
								},
							},
						},
					},
					required: ['modules'],
				},
			},
		],
		function_call: { name: 'createCourseOutline' },
	})

	if (
		typeof response.choices[0].message.function_call?.arguments === 'string'
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
						data: pathwayObj.modules,
					},
				},
			},
		})
		await db.message.create({
			data: {
				text: response.choices[0].message.function_call?.arguments,
				isUserMessage: false,
				pathwayId: pathway.id,
				userId: user.id,
			},
		})
	} else {
		return new Response('Generate Error', { status: 400 })
	}
}

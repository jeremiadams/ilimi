import { db } from '@/db'
import { openai } from '@/lib/openai'
import { GenerateContentValidator } from '@/lib/validators/GenerateContentValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	const { moduleId, pathwayId, moduleNumber, moduleTitle } =
		GenerateContentValidator.parse(body)

	// const firstUserMessage = `Create a course outline for ${message}. The course outline should be classified into modules and each module should contain a title and description.`

	// let response = await openai.chat.completions.create({
	// 	model: 'gpt-4o-mini',
	// 	messages: [
	// 		{
	// 			role: 'system',
	// 			content:
	// 				"You're a teaching assistant and your job is to help users generate courses, course outlines classified in modules and quizzes depending on the user request",
	// 		},
	// 		{
	// 			role: 'user',
	// 			content: firstUserMessage,
	// 		},
	// 	],
	// 	functions: [
	// 		{
	// 			name: 'createCourseOutline',
	// 			description: 'Create a course outline for the user',
	// 			parameters: {
	// 				type: 'object',
	// 				properties: {
	// 					title: {
	// 						type: 'string',
	// 						description: 'The title of the course the user wants to generate',
	// 					},
	// 					description: {
	// 						type: 'string',
	// 						description: 'An overview of what the course is about',
	// 					},
	// 					modules: {
	// 						type: 'array',
	// 						description:
	// 							'An array of modules in the course outline consisting of objects that have a title and a description for each module',
	// 						items: {
	// 							type: 'object',
	// 							properties: {
	// 								title: {
	// 									type: 'string',
	// 								},
	// 								description: {
	// 									type: 'string',
	// 								},
	// 							},
	// 						},
	// 					},
	// 				},
	// 				required: ['title', 'description', 'modules'],
	// 			},
	// 		},
	// 	],
	// 	function_call: { name: 'createCourseOutline' },
	// })

	// // return NextResponse.json({ response }, { status: 200 })

	// if (
	// 	typeof response.choices[0].message.function_call?.arguments === 'string' &&
	// 	typeof JSON.parse(response.choices[0].message.function_call?.arguments) ===
	// 		'object'
	// ) {
	// 	const pathwayObj = JSON.parse(
	// 		response.choices[0].message.function_call?.arguments
	// 	)
	// 	const pathway = await db.pathway.create({
	// 		data: {
	// 			title: pathwayObj.title,
	// 			description: pathwayObj.description,
	// 			userId: user.id,
	// 			Module: {
	// 				createMany: {
	// 					data: pathwayObj?.modules,
	// 				},
	// 			},
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
	// 			isUserMessage: false,
	// 			pathwayId: pathway?.id,
	// 			userId: user.id,
	// 		},
	// 	})

	// 	return NextResponse.json({ pathway }, { status: 200 })
	// } else {
	// 	return new Response('Cannot generate content at the moment', {
	// 		status: 400,
	// 	})
	// }

	const pathway = await db.pathway.findFirst({
		where: {
			id: pathwayId,
			userId: user.id,
		},
	})

	if (!pathway) return new Response('Not found', { status: 404 })

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
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content:
					"You're a teaching assistant and your job is to teach users by helping them generate detailed content for course modules. Ensure to explain concepts, with examples were necessary. Include images and links were necessary. Ensure that the links and images be linked to a valid source not an example url. Do not include quizzes or excercises.",
			},
			{
				role: 'user',
				content: `Generate a course content for module ${moduleNumber}: ${moduleTitle} strictly in markdown format. Use the following pieces of information (which is in a stringified JSON format ) for context:

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
				name: 'generateModuleContent',
				description: 'Generate course content for a module ',
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
		function_call: { name: 'generateModuleContent' },
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

		return NextResponse.json('Successfully generated content', { status: 200 })
	} else {
		return new Response('Cannot generate pathway', { status: 400 })
	}
}

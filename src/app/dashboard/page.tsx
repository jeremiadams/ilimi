import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

	const dbUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	})

	// const pathway = await db.pathway.create({
	// 	data: {
	// 		title: 'testing',
	// 		description: 'testing it',
	// 		userId: 'kp_c56cab8c0e194792b671724ad34e62e8',
	// 		Module: {
	// 			createMany: {
	// 				data: [
	// 					{ title: 'yo', description: 'yoyo' },
	// 					{ title: 'mo', description: 'momo' },
	// 				],
	// 			},
	// 		},
	// 	},
	// })

	// console.log(message)

	// const message = await db.message.create({
	// 	data: {
	// 		text: 'testing mess',
	// 		isUserMessage: false,
	// 		pathwayId: 'clz2pll4g001lgdkz36oui6p0',
	// 		userId: 'kp_c56cab8c0e194792b671724ad34e62e8',
	// 	},
	// })

	// console.log(message)

	if (!dbUser) redirect('/auth-callback?origin=dashboard')

	return <Dashboard />
}

export default Page

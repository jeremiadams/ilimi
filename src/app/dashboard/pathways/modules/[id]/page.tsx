import OneModule from '@/components/OneModule'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
	params: {
		id: string
	}
}

const Page: FC<PageProps> = async ({ params }) => {
	const { id } = params

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id)
		redirect(`/auth-callback?origin=dashboard/pathways/modules/${id}`)

	const singleModule = await db.module.findFirst({
		where: {
			id: id,
		},
	})

	console.log(singleModule)

	if (!singleModule) notFound()

	return (
		<OneModule
			title={singleModule.title}
			description={singleModule.description}
			content={singleModule.content}
		/>
	)
}

export default Page

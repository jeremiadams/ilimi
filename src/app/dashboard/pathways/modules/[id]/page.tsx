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

	if (!singleModule) notFound()

	const firstQuery = await db.module.findFirst({
		where: {
			pathwayId: singleModule.pathwayId,
		},
		orderBy: {
			id: 'asc',
		},
		select: {
			id: true,
		},
	})

	const lastQuery = await db.module.findFirst({
		where: {
			pathwayId: singleModule.pathwayId,
		},
		orderBy: {
			id: 'desc',
		},
		select: {
			id: true,
		},
	})

	const prevQuery = await db.module.findMany({
		take: -1,
		skip: 1,
		cursor: {
			id,
		},
		select: {
			id: true,
		},
	})

	const nextQuery = await db.module.findMany({
		take: 1,
		skip: 1,
		cursor: {
			id,
		},
		select: {
			id: true,
		},
	})

	return (
		<OneModule
			id={id}
			title={singleModule.title}
			description={singleModule.description}
			content={singleModule.content}
			pathwayId={singleModule.pathwayId}
			firstModuleId={firstQuery?.id}
			lastModuleId={lastQuery?.id}
			prevPageId={prevQuery[0]?.id}
			nextPageId={nextQuery[0]?.id}
		/>
	)
}

export default Page

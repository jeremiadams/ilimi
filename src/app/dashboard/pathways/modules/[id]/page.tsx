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

	const singleSection = await db.section.findFirst({
		where: {
			id: id,
		},
	})

	if (!singleSection) notFound()

	const moduleForSection = await db.module.findFirst({
		where: {
			id: singleSection.moduleId!,
		},
	})

	const firstQuery = await db.section.findFirst({
		where: {
			moduleId: singleSection.moduleId,
		},
		orderBy: {
			id: 'asc',
		},
		select: {
			id: true,
		},
	})

	const lastQuery = await db.section.findFirst({
		where: {
			moduleId: singleSection.moduleId,
		},
		orderBy: {
			id: 'desc',
		},
		select: {
			id: true,
		},
	})

	const prevQuery = await db.section.findMany({
		take: -1,
		skip: 1,
		cursor: {
			id,
		},
		select: {
			id: true,
		},
	})

	const nextQuery = await db.section.findMany({
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
			title={singleSection.title}
			// description={singleModule.description}
			content={singleSection.content}
			pathwayId={moduleForSection?.pathwayId}
			moduleId={singleSection.moduleId}
			firstSectionId={firstQuery?.id}
			lastSectionId={lastQuery?.id}
			prevPageId={prevQuery[0]?.id}
			nextPageId={nextQuery[0]?.id}
		/>
	)
}

export default Page

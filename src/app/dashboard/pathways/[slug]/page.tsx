import OnePathway from '@/components/OnePathway'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
	params: {
		slug: string
	}
}

const Page: FC<PageProps> = async ({ params }) => {
	const { slug } = params

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id)
		redirect(`/auth-callback?origin=dashboard/pathways/${slug}`)

	const pathway = await db.pathway.findFirst({
		where: {
			id: slug,
			userId: user.id,
		},
		select: {
			title: true,
			description: true,
			difficulty: true,
			Module: {
				select: {
					id: true,
					title: true,
					pathwayStatus: true,
					Section: {
						select: {
							id: true,
							title: true,
							content: true,
							pathwayStatus: true,
							moduleId: true,
						},
						orderBy: [
							{
								id: 'asc',
							},
						],
					},
				},
				orderBy: [
					{
						id: 'asc',
					},
				],
			},
		},
	})

	if (!pathway) notFound()

	return (
		<OnePathway
			id={slug}
			title={pathway.title}
			description={pathway.description}
			difficulty={pathway.difficulty}
			modules={pathway.Module}
		/>
	)
}

export default Page

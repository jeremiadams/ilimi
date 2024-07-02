import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
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

	return <div>{slug}</div>
}

export default Page

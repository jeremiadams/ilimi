import OnePathway from '@/components/OnePathway'
import Pathways from '@/components/Pathways'
import Quiz from '@/components/Quiz'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) redirect('/auth-callback?origin=dashboard/pathways')

	return <Pathways />
}

export default page

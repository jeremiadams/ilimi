import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

	return <div className='text-white'>{user.email}</div>
}

export default Page

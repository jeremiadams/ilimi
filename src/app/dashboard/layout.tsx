import DashboardNav from '@/components/DashboardNav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	return (
		<div className='flex flex-col sm:flex-row min-h-screen w-full text-[#FAFAFA] bg-[#09090b]'>
			<DashboardNav user={user} />
			<main className='max-[639px]:ml-0 min-[640px]:ml-20 md:ml-60 w-full min-h-[calc(100vh-4rem)] sm:h-auto p-5 sm:p-10 bg-[#151518]'>
				{children}
			</main>
		</div>
	)
}

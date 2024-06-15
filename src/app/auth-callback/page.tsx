// 'use client'
import { redirect } from 'next/navigation'
import { trpc } from '../_trpc/client'

const Page = ({}) => {
	// const searchParams = useSearchParams()

	// const origin = searchParams.get('origin')

	const { data, isLoading, isError, isSuccess } = trpc.authCallback.useQuery()

	if (isSuccess) {
		redirect(data.origin ? `/${data.origin}` : 'dashboard')
	}
}

export default Page

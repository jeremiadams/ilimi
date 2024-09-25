'use client'

import { FC } from 'react'
import Loading from './Loading'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '@/app/_trpc/client'

interface AuthCallbackProps {}

const AuthCallback: FC<AuthCallbackProps> = ({}) => {
	const router = useRouter()

	const searchParams = useSearchParams()
	const origin = searchParams.get('origin')

	const { data, isLoading, isError, isSuccess, error } =
		trpc.authCallback.useQuery(undefined, {
			retry: true,
			retryDelay: 500,
		})

	if (isSuccess) {
		router.push(origin ? `/${origin}` : 'dashboard')
	} else if (isError) {
		if (error.data?.code === 'UNAUTHORIZED') {
			router.push('/')
		}
	}

	return (
		<div className=' w-full mt-24 flex justify-center text-white'>
			<div className='flex flex-col items-center'>
				<Loading />
				<h3 className=' font-semibold text-xl mt-2'>
					Setting up your account...
				</h3>
				<p>You will be redirected automatically</p>
			</div>
		</div>
	)
}

export default AuthCallback

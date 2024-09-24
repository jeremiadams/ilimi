'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import Loading from '@/components/Loading'
import { Suspense } from 'react'

const Page = ({}) => {
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
			router.push('/sign-in')
		}
	}

	return (
		<Suspense
			fallback={
				<>
					<div className=' w-full mt-24 flex justify-center text-white'>
						<div className='flex flex-col items-center'>
							<Loading />
							<h3 className=' font-semibold text-xl mt-2'>
								Setting up your account...
							</h3>
							<p>You will be redirected automatically</p>
						</div>
					</div>
				</>
			}
		>
			<div className=' w-full mt-24 flex justify-center text-white'>
				<div className='flex flex-col items-center'>
					<Loading />
					<h3 className=' font-semibold text-xl mt-2'>
						Setting up your account...
					</h3>
					<p>You will be redirected automatically</p>
				</div>
			</div>
		</Suspense>
	)
}

export default Page

'use client'

import { FC } from 'react'
import { Button, buttonVariants } from './ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { trpc } from '@/app/_trpc/client'

interface UpgradeButtonProps {}

const UpgradeButton: FC<UpgradeButtonProps> = ({}) => {
	const { mutate: createPaystackSession } =
		trpc.createPaystackSession.useMutation({
			onSuccess: ({ url }) => {
				window.location.href = url ?? 'dashboard/error-here'
			},
		})

	return (
		<Button
			onClick={() => createPaystackSession()}
			className='w-full bg-[#1e1922] hover:bg-[#312a37] text-white rounded-md py-3'
			variant={'hero'}
			size={'icon'}
		>
			Upgrade now <ArrowRightIcon className='ml-2 h-4 w-4' />
		</Button>
	)
}

export default UpgradeButton

'use client'

import { FC } from 'react'
import { buttonVariants } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'

interface ModuleNavBtnsProps {
	id: string
	pathwayId: string | null
	firstModuleId: string | undefined
	lastModuleId: string | undefined
	prevPageId: string
	nextPageId: string
	nextModuleContent: boolean
}

const ModuleNavBtns: FC<ModuleNavBtnsProps> = ({
	id,
	pathwayId,
	firstModuleId,
	lastModuleId,
	prevPageId,
	nextPageId,
	nextModuleContent,
}) => {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate } = trpc.markModuleAsComplete.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
	})

	const handleMarkAsCompleted = () => {
		mutate({ id })
	}

	return (
		<div className='flex items-center justify-between pt-16'>
			<button
				className={buttonVariants({
					size: 'icon',
					variant: 'transparent',
					className:
						' text-[#fafafab9] hover:text-[#FAFAFA] disabled:cursor-default',
				})}
				onClick={() => {
					handleMarkAsCompleted()
					if (firstModuleId === id) {
						router.push(`/dashboard/pathways/${pathwayId}`)
						return
					}
					router.push(`/dashboard/pathways/modules/${prevPageId}`)
				}}
			>
				<ChevronLeft className='mr-2 h-4 w-4 ' />
				Previous
			</button>

			<button
				className={buttonVariants({
					size: 'icon',
					variant: 'transparent',
					className: ' text-[#fafafab9] hover:text-[#FAFAFA]',
				})}
				onClick={() => {
					handleMarkAsCompleted()

					if (lastModuleId === id) {
						router.push(`/dashboard/pathways/${pathwayId}`)
						return
					}

					if (nextModuleContent) {
						router.push(`/dashboard/pathways/modules/${nextPageId}`)
						return
					} else {
						router.push(`/dashboard/pathways/${pathwayId}`)
					}
				}}
				// disabled={isLoading}
			>
				Next
				<ChevronRight className='ml-2 h-4 w-4 ' />
			</button>
		</div>
	)
}

export default ModuleNavBtns

'use client'

import { FC, useState } from 'react'
import { buttonVariants } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'

interface ModuleNavBtnsProps {
	id: string
	moduleId: string | null
	pathwayId: string | null | undefined
	firstSectionId: string | undefined
	lastSectionId: string | undefined
	prevPageId: string
	nextPageId: string
	nextModuleContent: boolean
}

const ModuleNavBtns: FC<ModuleNavBtnsProps> = ({
	id,
	moduleId,
	pathwayId,
	firstSectionId,
	lastSectionId,
	prevPageId,
	nextPageId,
	nextModuleContent,
}) => {
	const router = useRouter()

	const queryClient = useQueryClient()

	const [loading, setLoading] = useState<boolean>(false)

	const { mutate } = trpc.markSectionAsComplete.useMutation({
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
					// handleMarkAsCompleted()
					if (firstSectionId === id) {
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
					// handleMarkAsCompleted()

					if (lastSectionId === id) {
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
			>
				Next
				<ChevronRight className='ml-2 h-4 w-4 ' />
			</button>
		</div>
	)
}

export default ModuleNavBtns

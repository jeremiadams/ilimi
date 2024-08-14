'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { Badge } from './ui/badge'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Loader2 } from 'lucide-react'
import Loading from './Loading'

interface ModuleProps {
	id: string
	title: string | null
	index: number
	pathwayStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
	generateContent: ({
		moduleTitle,
		moduleNumber,
		moduleId,
	}: {
		moduleTitle: string
		moduleNumber: string
		moduleId: string
	}) => void
	isLoading: boolean
}

const Module: FC<ModuleProps> = ({
	id,
	title,
	index,
	pathwayStatus,
	generateContent,
	isLoading,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Dialog
			open={isLoading ? isLoading : isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setIsOpen(v)
				}
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<button
					onClick={() =>
						generateContent({
							moduleId: id,
							moduleNumber: `${index + 1}`,
							moduleTitle: title!,
						})
					}
					disabled={isLoading}
					className=' cursor-pointer py-3 px-4 sm:py-6 sm:px-8 block transition-all max-w-[850px] bg-[#09090b] border border-[#27272A] hover:border-transparent hover:bg-[#000] hover:shadow-[0px_5px_8px_5px_#121216] duration-500 rounded-lg'
				>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<div className='hidden sm:flex h-12 shrink-0 bg-[#7058d0] px-4 text-black rounded-md font-medium justify-center items-center'>
								<span>{`Module ${index + 1}`}</span>
							</div>
							<span className=' font-semibold text-lg sm:text-xl line-clamp-2'>
								{title}
							</span>
						</div>
						<Badge
							variant={
								pathwayStatus === 'NOT_STARTED' ? 'completed' : 'progress'
							}
							className='sm:ml-10 shrink-0'
						>
							{pathwayStatus === 'NOT_STARTED' ? 'Start' : 'In progress'}
						</Badge>
					</div>
				</button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-lg border-[#27272A]'>
				<DialogHeader>
					<DialogTitle className='text-lg pt-5 pb-2'>
						<div className=' text-xl flex justify-center items-center'>
							<Loading />
						</div>
					</DialogTitle>
					<DialogDescription className='text-[#FAFAFA] text-center pb-5'>
						<span className=' text-xl font-semibold'>
							Fetching module content...
						</span>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default Module

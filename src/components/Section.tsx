'use client'

import { FC, useState } from 'react'
import { Badge } from './ui/badge'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Loader2 } from 'lucide-react'
import GenerateContentLoadingDialog from './GenerateContentLoadingDialog'
import { MagicWandIcon } from '@radix-ui/react-icons'

interface SectionProps {
	id: string
	title: string | null
	index: number
	moduleTitle: string | null
	moduleId: string
	pathwayStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
	generateContent: ({
		moduleTitle,
		moduleNumber,
		sectionId,
		sectionTitle,
		moduleId,
	}: {
		moduleTitle: string
		moduleNumber: string
		sectionId: string
		sectionTitle: string
		moduleId: string
		difficulty: string
	}) => void
	progress: number
	contentPreview: string
	isLoading: boolean
	isRedirecting: boolean
	difficulty: string
}

const Section: FC<SectionProps> = ({
	id,
	title,
	index,
	moduleTitle,
	moduleId,
	pathwayStatus,
	generateContent,
	progress,
	contentPreview,
	isLoading,
	isRedirecting,
	difficulty,
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
					onClick={() => {
						generateContent({
							moduleTitle: moduleTitle!,
							moduleNumber: `${index + 1}`,
							sectionId: id,
							sectionTitle: title!,
							moduleId,
							difficulty,
						})
					}}
					disabled={isLoading}
					className=' cursor-pointer py-3 px-4 sm:py-4 sm:px-6 block transition-all max-w-[850px] bg-[#09090b] border border-[#27272A] hover:border-transparent hover:bg-[#000] hover:shadow-[0px_5px_8px_5px_#121216] duration-500 rounded-lg'
				>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<span className='text-left font-semibold text-lg sm:text-xl line-clamp-2'>
								{title}
							</span>
						</div>
						<Badge
							variant={
								pathwayStatus === 'NOT_STARTED' ? 'completed' : 'progress'
							}
							className='sm:ml-10 shrink-0'
						>
							{pathwayStatus === 'NOT_STARTED'
								? 'Start'
								: pathwayStatus === 'COMPLETED'
								? 'Completed'
								: 'In progress'}
						</Badge>
					</div>
				</button>
			</DialogTrigger>
			<DialogContent
				aria-describedby='generating content progress bar and loaders'
				className='sm:max-w-lg border-[#27272A]'
			>
				<DialogHeader>
					{progress === 0 && !contentPreview ? (
						<DialogTitle className='text-lg pt-5 pb-2'>
							<div className=' text-xl flex justify-center items-center'>
								<div className='flex flex-col items-center'>
									<Loader2 className=' w-8 h-8 text-[#e389ba] animate-spin' />
									<span className=' text-lg text-[#FAFAFA]'>Loading...</span>
								</div>
							</div>
						</DialogTitle>
					) : (
						<DialogDescription className='flex flex-col gap-4 item py-5'>
							<div className='text-[#FAFAFA] flex items-center gap-4 p-5 border border-[#27272A] rounded'>
								<div>
									<MagicWandIcon className='w-5 h-5' />
								</div>
								<div className=' flex flex-col'>
									<span className=' font-semibold line-clamp-2'>
										Generating content for: {title}
									</span>
								</div>
							</div>
							<div className=' pl-5'>
								<GenerateContentLoadingDialog
									progress={progress}
									isRedirecting={isRedirecting}
									contentPreview={contentPreview}
								/>
							</div>
						</DialogDescription>
					)}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default Section

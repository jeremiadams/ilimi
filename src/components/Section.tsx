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
import { Progress } from './ui/progress'

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
	isLoading: boolean
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
	isLoading,
	difficulty,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const [isGenerating, setIsGenerating] = useState<boolean>(true)
	const [generateProgress, setGenerateProgress] = useState<number>(0)

	// const simulatedProgress = () => {
	// 	setGenerateProgress(0)

	// 	const interval = setInterval(() => {
	// 		setGenerateProgress((prevProgress) => {
	// 			if (prevProgress >= 95) {
	// 				clearInterval(interval)
	// 				return prevProgress
	// 			}

	// 			return prevProgress + 1
	// 		})
	// 	}, 500)

	// 	return interval
	// }

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
						// const progressInterval = simulatedProgress()

						// clearInterval(progressInterval)
						// setGenerateProgress(100)
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
					{/* {isLoading ? (
						<div className=' w-full mt-4 mb-4 mx-auto'>
							<Progress value={generateProgress} className=' h-1 w-full' />
						</div>
					) : null} */}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default Section

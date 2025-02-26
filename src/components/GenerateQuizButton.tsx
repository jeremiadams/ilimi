'use client'

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
import Loading from './Loading'
import { ArrowRight, Loader2 } from 'lucide-react'
import Quiz from './Quiz'
import { nanoid } from 'nanoid'
import { Button, buttonVariants } from './ui/button'

interface GenerateQuizButtonProps {
	isLoading: boolean
	generateQuiz: () => void
}

const GenerateQuizButton: FC<GenerateQuizButtonProps> = ({
	isLoading,
	generateQuiz,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setIsOpen(v)
				} else {
				}
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<button
					onClick={() => {
						generateQuiz()
					}}
					disabled={isLoading}
					className='cursor-pointer mt-5  py-3 px-4 sm:py-6 sm:px-8 block transition-all sm:max-w-lg bg-[#7058d0] border border-[#27272A] hover:border-transparent hover:bg-[#5c47b1] hover:shadow-[0px_5px_8px_5px_#121216] duration-500 rounded-lg'
				>
					<div className='flex justify-between items-center gap-5'>
						<div className=''>
							<span className=' font-semibold text-lg sm:text-xl line-clamp-2'>
								Review: Answer a Quiz
							</span>
						</div>
						<span className='rounded-md p-3 bg-[#5c47b1]'>
							<ArrowRight className='w-5 h-5' />
						</span>
					</div>
				</button>
			</DialogTrigger>
			<DialogContent className=' max-h-screen max-w-4xl overflow-scroll no-scrollbar border-[#27272A] my-5 pb-20'>
				<DialogHeader className={isLoading ? '' : 'hidden'}>
					<DialogTitle className='text-lg pt-5 pb-2'>
						<div className=' text-xl flex justify-center items-center'>
							<div className=' flex justify-center items-center'>
								<div className='flex flex-col items-center'>
									<Loader2 className=' w-8 h-8 text-[#e389ba] animate-spin' />
									<span className=' text-lg text-[#FAFAFA]'>
										Generating quiz...
									</span>
								</div>
							</div>
						</div>
					</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default GenerateQuizButton

///*sm:max-w-lg*/

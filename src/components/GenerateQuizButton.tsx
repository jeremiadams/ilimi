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
import { ArrowRight } from 'lucide-react'
import { QuestionsAndAnswers } from '@/lib/types/QuestionsAndAnswers'
import Quiz from './Quiz'
import { nanoid } from 'nanoid'
import { Button, buttonVariants } from './ui/button'

interface GenerateQuizButtonProps {
	isLoading: boolean
	generateQuiz: () => void
	questions: QuestionsAndAnswers[]
	checkSelected: (id: string, question: string) => void
	checkAnswers: () => void
	mark: boolean
	score: number
	resetQuiz: () => void
}

const GenerateQuizButton: FC<GenerateQuizButtonProps> = ({
	isLoading,
	generateQuiz,
	questions,
	checkSelected,
	checkAnswers,
	mark,
	score,
	resetQuiz,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setIsOpen(v)
				} else {
					resetQuiz()
				}
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<button
					onClick={() => {
						generateQuiz()
					}}
					disabled={isLoading}
					className='cursor-pointer mt-5  py-3 px-4 sm:py-6 sm:px-8 block transition-all max-w-[850px] bg-[#7058d0] border border-[#27272A] hover:border-transparent hover:bg-[#5c47b1] hover:shadow-[0px_5px_8px_5px_#121216] duration-500 rounded-lg'
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
							<Loading />
						</div>
					</DialogTitle>
					<DialogDescription className='text-[#FAFAFA] text-center pb-5'>
						<span className=' text-xl font-semibold'>Generating quiz...</span>
					</DialogDescription>
				</DialogHeader>
				<div className=' '>
					{questions.length > 0 && (
						<div className='pb-10 border-b border-[#27272A]'>
							<div className='text-white'>
								<h1 className='font-medium text-4xl'>Quiz</h1>
								<p className='pt-4'>
									Kindly select the right answers from the following.
								</p>
							</div>
						</div>
					)}
					{questions.length > 0 &&
						questions.map((item, ind) => {
							return (
								<Quiz
									key={`${item.question + ind}`}
									question={item.question}
									answers={item.answers}
									checkSelected={checkSelected}
									mark={mark}
								/>
							)
						})}
					{mark && (
						<h3 className='mt-10 text-[#5c47b1] text-lg font-semibold'>
							You got {score}/{questions.length} correct answers
						</h3>
					)}
					{questions.length > 0 && (
						<button
							className={buttonVariants({
								size: 'icon',
								variant: 'hero',
								className:
									' h-11 rounded-md px-5 mt-10 bg-[#5c47b1] text-white hover:bg-[#523ca8]',
							})}
							onClick={checkAnswers}
							disabled={score > 0}
						>
							Check Answers
						</button>
					)}
				</div>
				{!isLoading && (
					<DialogFooter className='sm:justify-start'>
						<DialogClose asChild>
							<Button
								type='button'
								size='dashboard'
								variant='hero'
								className='h-10 rounded-md px-5 bg-[#212124] hover:bg-[#18181b] text-[#FAFAFA] text-sm'
							>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default GenerateQuizButton

///*sm:max-w-lg*/

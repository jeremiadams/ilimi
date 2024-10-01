'use client'

import { FC } from 'react'
import DashboardLayout from './DashboardNav'
import { buttonVariants } from './ui/button'
import { QuestionsAndAnswers } from '@/lib/types/QuestionsAndAnswers'
import { cn } from '@/lib/utils'

interface QuizProps {
	question: string
	answers: QuestionsAndAnswers['answers']
	checkSelected: (id: string, question: string) => void
	mark: boolean
}

//#f8bcbc
//rgb(148, 215, 162)
//#94D7A2

const Quiz: FC<QuizProps> = ({ question, answers, checkSelected, mark }) => {
	return (
		<>
			<div className='pt-10 flex flex-col gap-5'>
				<div className='flex flex-col gap-3 text-white'>
					<p className=' font-semibold text-lg'>{question}</p>
					<div className='flex gap-4 flex-wrap'>
						{answers.map((item) => {
							return (
								<button
									key={item.id!}
									className={cn(
										buttonVariants({
											variant: 'hero',
											size: 'quiz',
											className: `border rounded-xl hover:border-[#5c47b1] hover:bg-[#5c47b1] ${
												!mark && item.isSelected
													? 'border-[#5c47b1] bg-[#5c47b1]'
													: mark && item.isCorrect
													? 'border-[#32a64b] bg-[#32a64b]'
													: mark && item.isSelected && !item.isCorrect
													? 'border-[#e43535] bg-[#e43535]'
													: 'border-[#FAFAFA] bg-transparent'
											} `,
										})
									)}
									onClick={() => {
										checkSelected(item.id!, question)
									}}
									// disabled={mark}
								>
									{item.answer}
								</button>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export default Quiz

'use client'

import { FC, useContext, useState } from 'react'
import DashboardLayout from './DashboardNav'
import { buttonVariants } from './ui/button'
import { Questions } from '@/lib/types/QuestionsAndAnswers'
import { cn } from '@/lib/utils'
import QuizQuestion from './QuizQuestion'
import { AppContext } from '@/context/AppContext'
import { Ghost, Loader2 } from 'lucide-react'
import Loading from './Loading'
import { trpc } from '@/app/_trpc/client'
import { toast } from './ui/use-toast'
import { toast as sonnerToast } from 'sonner'

interface QuizProps {
	isComplete: boolean
	finalScore: number | null
	questions: Questions[]
	id: string
}

//#f8bcbc
//rgb(148, 215, 162)
//#94D7A2

const Quiz: FC<QuizProps> = ({ isComplete, finalScore, questions, id }) => {
	const [quiz, setQuiz] = useState<Questions[]>(() => questions)
	const [mark, setMark] = useState<boolean>(false)
	const [score, setScore] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)

	const checkSelected = <T extends 'radio' | 'checkbox'>(
		questionId: string,
		optionId: string,
		type: T,
		checked: T extends 'checkbox' ? boolean : boolean | string
	) => {
		if (type === 'radio') {
			setQuiz((prevQuestions) =>
				prevQuestions.map((item) => {
					if (item.id === questionId) {
						return {
							...item,
							options: item.options.map((option) => {
								if (option.id === optionId) {
									return {
										...option,
										is_selected: true,
									}
								} else {
									return {
										...option,
										is_selected: false,
									}
								}
							}),
						}
					} else {
						return item
					}
				})
			)
		} else if (type === 'checkbox' && typeof checked === 'boolean') {
			setQuiz((prevQuestions) =>
				prevQuestions.map((item) => {
					if (item.id === questionId) {
						return {
							...item,
							options: item.options.map((option) => {
								if (option.id === optionId) {
									return {
										...option,
										is_selected: checked,
									}
								} else {
									return option
								}
							}),
						}
					} else {
						return item
					}
				})
			)
		}
	}

	const checkAnswers = () => {
		setMark(true)

		quiz.forEach((question) => {
			if (question.type === 'MULTIPLE_CHOICE') {
				// Find the selected option
				const selectedOption = question.options.find(
					(option) => option.is_selected
				)

				// Check if there's a selected option and if it's correct
				if (selectedOption && selectedOption.is_correct) {
					setScore((prevScore) => prevScore + 1)
				}
			} else if (question.type === 'MULTIPLE_SELECT') {
				// Get all correct and selected options
				const correctOptions = question.options.filter(
					(option) => option.is_correct
				)
				const selectedOptions = question.options.filter(
					(option) => option.is_selected
				)

				// Ensure at least one option is selected
				if (selectedOptions.length === 0) {
					return // Skip scoring if nothing is selected
				}

				// Add 1 point only if all correct options are selected and no incorrect ones are chosen
				if (
					correctOptions.length === selectedOptions.length &&
					selectedOptions.every((option) => option.is_correct)
				) {
					setScore((prevScore) => prevScore + 1)
				}
			}
		})

		sonnerToast(
			`You correctly answered ${score} out of ${quiz.length} questions`
		)
	}

	const { mutate: saveQuiz } = trpc.saveQuiz.useMutation({
		onMutate: () => {
			setLoading(true)
		},
		onSuccess: () => {
			setLoading(false)
			// sonnerToast('Saved Quiz Successfully')
			toast({
				title: 'Saved Quiz Successfully',
				// description: 'Please try again',
				variant: 'default',
			})
		},
		onSettled: () => {
			setLoading(false)
		},
		onError: () => {
			return toast({
				title: 'Error saving quiz',
				description: 'Please try again',
				variant: 'destructive',
			})
		},
	})

	return (
		<>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>Quiz</h1>
				</div>
			</div>
			{quiz.length > 0 ? (
				<div className='pt-10'>
					{quiz.map((question, ind) => (
						<QuizQuestion
							key={question.id}
							number={ind}
							question={question}
							checkSelected={checkSelected}
							isComplete={isComplete}
							mark={mark}
						/>
					))}
				</div>
			) : (
				<div className=' w-full mt-28 flex justify-center text-white'>
					<div className='flex flex-col items-center'>
						<Loading />
					</div>
				</div>
			)}
			{quiz.length > 0 && (
				<div className='flex gap-4'>
					<button
						className={buttonVariants({
							size: 'icon',
							variant: 'hero',
							className:
								' h-11 rounded-md px-5 mt-10 bg-[#5c47b1] text-white hover:bg-[#523ca8]',
						})}
						onClick={checkAnswers}
						disabled={mark || isComplete}
					>
						Check Answers
					</button>
					<button
						className={buttonVariants({
							size: 'icon',
							variant: 'hero',
							className:
								' h-11 rounded-md px-5 mt-10 bg-[#2D9E51] text-white hover:bg-[#268745]',
						})}
						onClick={() => {
							const answeredQuestions = quiz.filter((question) =>
								question.options.some((option) => option.is_selected === true)
							)

							saveQuiz({
								quizId: id,
								score: score,
								questions: answeredQuestions.map((question) => {
									return {
										questionId: question.id,
										options: question.options,
									}
								}),
							})
						}}
						disabled={!mark}
					>
						{loading ? <Loader2 className=' animate-spin' /> : 'Save'}
					</button>
				</div>
			)}
			{(mark || isComplete) && (
				<p className='py-2 text-sm text-[#f1fafa]'>
					{finalScore
						? `You got ${finalScore} out of ${quiz.length} questions`
						: `You got ${score} out of ${quiz.length} questions`}
				</p>
			)}
		</>
	)
}

export default Quiz

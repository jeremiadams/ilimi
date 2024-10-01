'use client'
import { FC, useState, useContext } from 'react'
import DashboardLayout from './DashboardNav'
import Module from './Module'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Modules } from '@/lib/types/Modules'
import { AppContext } from '@/context/AppContext'
import { ArrowRight } from 'lucide-react'
import GenerateQuizButton from './GenerateQuizButton'
import { shuffleArray } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { QuestionsAndAnswers } from '@/lib/types/QuestionsAndAnswers'

interface OnePathwayProps {
	title: string
	description: string
	modules: Modules[]
	id: string
}

const OnePathway: FC<OnePathwayProps> = ({
	id,
	title,
	description,
	modules,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { toast } = useToast()

	const router = useRouter()

	const [questions, setQuestions] = useState<QuestionsAndAnswers[] | []>([])
	const [score, setScore] = useState<number>(0)
	const [mark, setMark] = useState<boolean>(false)

	const { mutate: generateContent } = useMutation({
		mutationFn: async ({
			moduleTitle,
			moduleNumber,
			moduleId,
		}: {
			moduleTitle: string
			moduleNumber: string
			moduleId: string
		}) => {
			const response = await fetch('/api/generateContent', {
				method: 'POST',
				body: JSON.stringify({
					pathwayId: id,
					moduleId,
					moduleNumber,
					moduleTitle,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			return { response: response.body, moduleId }
		},
		onSuccess: (response) => {
			setIsLoading(false)
			// queryClient.invalidateQueries()
			router.push(`/dashboard/pathways/modules/${response.moduleId}`)
		},
		onMutate: () => {
			setIsLoading(true)
		},
		onSettled: () => {
			setIsLoading(false)
		},
		onError: () => {
			return toast({
				title: 'There was an error generating content',
				description: 'Please try again',
				variant: 'destructive',
			})
		},
	})

	const { mutate: generateQuiz } = useMutation({
		mutationFn: async () => {
			const response = await fetch('/api/generateQuiz', {
				method: 'POST',
				body: JSON.stringify({
					pathwayId: id,
					pathwayTitle: title,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			return await response.json()
		},
		onSuccess: (response) => {
			setIsLoading(false)
			setQuestions(
				response.questionsAndAnswers.map((item: QuestionsAndAnswers) => {
					return {
						...item,
						answers: shuffleArray(
							item.answers.map((item) => {
								return {
									...item,
									id: nanoid(),
									isSelected: false,
								}
							})
						),
					}
				})
			)
		},
		onMutate: () => {
			setIsLoading(true)
		},
		onSettled: () => {
			setIsLoading(false)
		},
		onError: () => {
			return toast({
				title: 'There was an error generating quiz',
				description: 'Please try again later',
				variant: 'destructive',
			})
		},
	})

	const checkSelected = (id: string, question: string) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((item) => {
				if (item.question === question) {
					return {
						...item,
						answers: item.answers.map((answer) => {
							if (answer.id === id) {
								return {
									...answer,
									isSelected: true,
								}
							} else {
								return {
									...answer,
									isSelected: false,
								}
							}
						}),
					}
				} else {
					return item
				}
			})
		)
	}

	const checkAnswers = () => {
		setMark(true)
		for (const question of questions) {
			for (let i = 0; i < question.answers.length; i++) {
				if (
					question.answers[i].isSelected === true &&
					question.answers[i].isCorrect
				) {
					setScore((prevScore) => prevScore + 1)
				} else {
					continue
				}
			}
		}
	}

	const resetQuiz = () => {
		setQuestions([])
		setMark(false)
		setScore(0)
	}

	return (
		<>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
					<p className='pt-4'>{description}</p>
				</div>
			</div>
			<div className='pt-10 flex flex-col gap-5'>
				{modules.map((item, ind) => (
					<Module
						id={item.id}
						key={item.id}
						index={ind}
						title={item.title}
						pathwayStatus={item.pathwayStatus}
						isLoading={isLoading}
						generateContent={generateContent}
					/>
				))}
			</div>
			<GenerateQuizButton
				isLoading={isLoading}
				generateQuiz={generateQuiz}
				questions={questions}
				checkSelected={checkSelected}
				checkAnswers={checkAnswers}
				mark={mark}
				score={score}
				resetQuiz={resetQuiz}
			/>
		</>
	)
}

export default OnePathway

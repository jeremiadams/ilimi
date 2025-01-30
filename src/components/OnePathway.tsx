'use client'
import { FC, useState, useContext } from 'react'
import DashboardLayout from './DashboardNav'
import Module from './Module'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ModulesType } from '@/lib/types/Modules'
import { AppContext } from '@/context/AppContext'
import { ArrowRight } from 'lucide-react'
import GenerateQuizButton from './GenerateQuizButton'
import { shuffleArray } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { QuestionsAndAnswers } from '@/lib/types/QuestionsAndAnswers'
import { trpc } from '@/app/_trpc/client'

interface OnePathwayProps {
	title: string
	description: string
	difficulty: string
	modules: ModulesType[]
	id: string
}

const OnePathway: FC<OnePathwayProps> = ({
	id,
	title,
	description,
	difficulty,
	modules,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
	const [streamData, setStreamData] = useState<
		{ streamId: number; content: string }[]
	>([])

	const [progressFirst, setProgressFirst] = useState<number>(0) // Progress for the first stream
	const [progressSecond, setProgressSecond] = useState<number>(0)
	const [progressThird, setProgressThird] = useState<number>(0)

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

	const { toast } = useToast()

	const router = useRouter()

	const [questions, setQuestions] = useState<QuestionsAndAnswers[] | []>([])
	const [score, setScore] = useState<number>(0)
	const [mark, setMark] = useState<boolean>(false)

	const queryClient = useQueryClient()

	const { mutate: markAsComplete } = trpc.markSectionAsComplete.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
	})

	const { mutate: generateContent } = useMutation({
		mutationFn: async ({
			moduleTitle,
			moduleNumber,
			sectionId,
			sectionTitle,
			moduleId,
			difficulty,
		}: {
			moduleTitle: string
			moduleNumber: string
			sectionId: string
			sectionTitle: string
			moduleId: string
			difficulty: string
		}) => {
			const response = await fetch('/api/generateContent', {
				method: 'POST',
				body: JSON.stringify({
					pathwayId: id,
					moduleTitle,
					moduleNumber,
					sectionId,
					sectionTitle,
					moduleId,
					difficulty,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			return { response: response.body, sectionId }
		},
		onSuccess: async (response) => {
			// setIsLoading(false)
			// queryClient.invalidateQueries()
			// markAsComplete({ id: response.sectionId })
			// router.push(`/dashboard/pathways/modules/${response.sectionId}`)
			// return response
			if (!response.response) {
				return toast({
					title: 'There was a problem sending this message',
					description: 'Please refresh and try again',
					variant: 'destructive',
				})
			}

			// if (response.response?.alreadyGenerated) {

			// }

			const reader = response.response.getReader()
			const decoder = new TextDecoder()
			let done = false

			const initialChunk = await reader.read()
			const initialText = decoder.decode(initialChunk.value)
			const parsed = JSON.parse(initialText)

			if (parsed.alreadyGenerated) {
				// Redirect immediately if content is already generated
				router.push(`/dashboard/pathways/modules/${response.sectionId}`)
				return
			}

			let chunksFirst = 0 // Tracks chunks received for the first stream
			let chunksSecond = 0 // Tracks chunks received for the second stream
			let chunksThird = 0
			const firstTotalChunks = 580
			const secondTotalChunks = 700
			const thirdTotalChunks = 1200

			const chunks: { streamId: number; content: string }[] = []

			while (!done) {
				const { value, done: streamDone } = await reader.read()
				done = streamDone

				if (value) {
					const chunk = decoder.decode(value, { stream: true })
					chunk.split('\n').forEach((line) => {
						if (line.trim()) {
							const parsed = JSON.parse(line)
							if (parsed.content) {
								if (parsed.streamId === 1) {
									chunksFirst += 1
									setProgressFirst(
										Math.min((chunksFirst / firstTotalChunks) * 100, 100)
									)
								} else if (parsed.streamId === 2) {
									chunksSecond += 1
									setProgressSecond(
										Math.min((chunksSecond / secondTotalChunks) * 100, 100)
									)
								} else if (parsed.streamId === 3) {
									chunksThird += 1
									setProgressThird(
										Math.min((chunksSecond / thirdTotalChunks) * 100, 100)
									)
								}
								setStreamData([
									{ streamId: parsed.streamId, content: parsed.content },
								])
								chunks.push({
									streamId: parsed.streamId,
									content: parsed.content,
								})
							}
						}
					})
				}
			}
			if (chunksFirst > 0) {
				setProgressFirst(100) // Update first stream's progress to 100%
			}
			if (chunksSecond > 0) {
				setProgressSecond(100) // Update second stream's progress to 100%
			}
			if (chunksThird > 0) {
				setProgressThird(100) // Update second stream's progress to 100%
			}

			if (chunksFirst > 0 && chunksSecond > 0 && chunksThird > 0) {
				setIsRedirecting(true)
				markAsComplete({ id: response.sectionId })
				router.push(`/dashboard/pathways/modules/${response.sectionId}`)
			}

			return chunks
		},
		onMutate: () => {
			setIsLoading(true)
			setIsRedirecting(false)
			setProgressFirst(0)
			setProgressSecond(0)
			setStreamData([])
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

	// console.log(streamData)

	return (
		<>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
					<p className='pt-4'>{description}</p>
				</div>
			</div>
			<div className='pt-10 flex flex-col gap-5'>
				{modules.map((item: any, ind: any) => (
					<Module
						id={item.id}
						key={item.id}
						index={ind}
						title={item.title}
						isLoading={isLoading}
						isRedirecting={isRedirecting}
						generateContent={generateContent}
						streamData={streamData}
						progressFirst={progressFirst}
						progressSecond={progressSecond}
						progressThird={progressThird}
						sections={item.Section}
						difficulty={difficulty}
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

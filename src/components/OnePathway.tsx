'use client'
import { FC, useState } from 'react'
import Module from './Module'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ModulesType } from '@/lib/types/Modules'
import GenerateQuizButton from './GenerateQuizButton'
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
	const [progress, setProgress] = useState<number>(0)
	const [contentPreview, setContentPreview] = useState<string>('')

	const { toast } = useToast()
	const router = useRouter()
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
			if (!response.response) {
				return toast({
					title: 'There was a problem sending this message',
					description: 'Please refresh and try again',
					variant: 'destructive',
				})
			}

			const reader = response.response.getReader()
			const decoder = new TextDecoder()
			let done = false

			// Check first chunk for already generated content
			const initialChunk = await reader.read()
			const initialText = decoder.decode(initialChunk.value)

			try {
				const parsed = JSON.parse(initialText)
				if (parsed.alreadyGenerated) {
					router.push(`/dashboard/pathways/modules/${response.sectionId}`)
					return
				}

				// First chunk might contain content
				if (parsed.content) {
					setContentPreview(parsed.content)
					setProgress(5)
				}
			} catch {
				// Initial chunk might be content, not JSON object
			}

			let chunks = 0
			const estimatedTotalChunks = 800 // Single stream estimate
			let fullContent = ''

			while (!done) {
				const { value, done: streamDone } = await reader.read()
				done = streamDone

				if (value) {
					const chunk = decoder.decode(value, { stream: true })
					chunk.split('\n').forEach((line) => {
						if (line.trim()) {
							try {
								const parsed = JSON.parse(line)

								if (parsed.content) {
									chunks += 1
									fullContent += parsed.content
									setProgress(
										Math.min((chunks / estimatedTotalChunks) * 100, 95)
									)
									// Update preview with last ~200 chars
									if (fullContent.length > 200) {
										setContentPreview(
											'...' + fullContent.slice(-200)
										)
									} else {
										setContentPreview(fullContent)
									}
								}

								if (parsed.done) {
									setProgress(100)
								}

								if (parsed.error) {
									throw new Error(parsed.error)
								}
							} catch (parseError) {
								// Ignore parse errors for incomplete JSON
							}
						}
					})
				}
			}

			// Complete
			if (chunks > 0) {
				setProgress(100)
				setIsRedirecting(true)
				markAsComplete({ id: response.sectionId })

				// Small delay before redirect to show completion state
				setTimeout(() => {
					router.push(`/dashboard/pathways/modules/${response.sectionId}`)
				}, 500)
			}
		},
		onMutate: () => {
			setIsLoading(true)
			setIsRedirecting(false)
			setProgress(0)
			setContentPreview('')
		},
		onSettled: () => {
			setIsLoading(false)
		},
		onError: () => {
			return toast({
				title: 'There was an error streaming content',
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
					difficulty,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			return await response.json()
		},
		onSuccess: (response) => {
			setIsLoading(false)
			router.push(`/dashboard/pathways/quiz/${response.quizId}`)
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
						progress={progress}
						contentPreview={contentPreview}
						sections={item.Section}
						difficulty={difficulty}
					/>
				))}
			</div>
			<GenerateQuizButton isLoading={isLoading} generateQuiz={generateQuiz} />
		</>
	)
}

export default OnePathway

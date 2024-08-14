'use client'
import { FC, useState } from 'react'
import DashboardLayout from './DashboardLayout'
import Module from './Module'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface Modules {
	id: string
	title: string | null
	pathwayStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
}

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

	return (
		<DashboardLayout>
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
		</DashboardLayout>
	)
}

export default OnePathway

'use client'

import { useToast } from '@/components/ui/use-toast'
import { Questions } from '@/lib/types/QuestionsAndAnswers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	ChangeEvent,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react'

interface AppContextProps {
	createPathway: () => void
	message: string
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
	isLoading: boolean
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setMessage: Dispatch<SetStateAction<string>>
	difficulty: string
	setDifficulty: Dispatch<
		SetStateAction<'beginnerToIntermediate' | 'expert' | 'noPreference'>
	>
	currentStep: number
	isRedirecting: boolean
}

export const AppContext = createContext<AppContextProps>({
	createPathway: () => {},
	message: '',
	handleInputChange: () => {},
	isLoading: false,
	isOpen: false,
	setIsOpen: () => {},
	setMessage: () => {},
	difficulty: '',
	setDifficulty: () => {},
	currentStep: 0,
	isRedirecting: false,
})

interface AppContextProviderProps {
	children: ReactNode
}

export const AppContextProvider: FC<AppContextProviderProps> = ({
	children,
}) => {
	const [message, setMessage] = useState<string>('')
	const [difficulty, setDifficulty] = useState<
		'beginnerToIntermediate' | 'expert' | 'noPreference'
	>('beginnerToIntermediate')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [currentStep, setCurrentStep] = useState<number>(0)
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false)

	const { toast } = useToast()

	const queryClient = useQueryClient()

	const { mutate: sendMessage } = useMutation({
		mutationFn: async ({
			message,
			difficulty,
		}: {
			message: string
			difficulty: string
		}) => {
			// Step 1: Validating input
			setCurrentStep(1)

			const response = await fetch('/api/createPathway', {
				method: 'POST',
				body: JSON.stringify({
					message,
					difficulty:
						difficulty === 'beginnerToIntermediate'
							? 'Beginners to Intermediate'
							: difficulty === 'expert'
							? 'Experts'
							: 'No Preference',
				}),
			})

			// Step 2: Generating (happens server-side, simulate progress)
			setCurrentStep(2)

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error)
			}

			// Step 3: Creating pathway
			setCurrentStep(3)

			return response.json()
		},
		onSuccess: () => {
			setCurrentStep(4)
			setIsRedirecting(true)
			queryClient.invalidateQueries()
			setTimeout(() => {
				setIsLoading(false)
				setIsOpen(false)
				setIsRedirecting(false)
				setCurrentStep(0)
			}, 1000)
		},
		onMutate: () => {
			setIsLoading(true)
			setIsOpen(true)
			setCurrentStep(1)
			setIsRedirecting(false)
		},
		onSettled: () => {
			// Don't reset immediately, let success handler do it
		},
		onError: (error) => {
			setIsLoading(false)
			setIsOpen(false)
			setCurrentStep(0)
			setIsRedirecting(false)
			return toast({
				title: error.message,
				description: 'Please try again',
				variant: 'destructive',
			})
		},
	})

	const createPathway = () => sendMessage({ message, difficulty })

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value)
	}

	return (
		<AppContext.Provider
			value={{
				createPathway,
				message,
				handleInputChange,
				isLoading,
				isOpen,
				setIsOpen,
				setMessage,
				difficulty,
				setDifficulty,
				currentStep,
				isRedirecting,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

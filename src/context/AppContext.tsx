'use client'

import { useToast } from '@/components/ui/use-toast'
import { Modules } from '@/lib/types/Modules'
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
}

export const AppContext = createContext<AppContextProps>({
	createPathway: () => {},
	message: '',
	handleInputChange: () => {},
	isLoading: false,
	isOpen: false,
	setIsOpen: () => {},
	setMessage: () => {},
})

interface AppContextProviderProps {
	children: ReactNode
}

export const AppContextProvider: FC<AppContextProviderProps> = ({
	children,
}) => {
	const [message, setMessage] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { toast } = useToast()

	const queryClient = useQueryClient()

	const { mutate: sendMessage } = useMutation({
		mutationFn: async ({ message }: { message: string }) => {
			const response = await fetch('/api/createPathway', {
				method: 'POST',
				body: JSON.stringify({
					message,
				}),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error)
			}

			return response.body
		},
		onSuccess: () => {
			setIsLoading(false)
			setIsOpen(false)
			queryClient.invalidateQueries()
		},
		onMutate: () => {
			setIsLoading(true)
			setIsOpen(true)
		},
		onSettled: () => {
			setIsLoading(false)
			setIsOpen(false)
		},
		onError: (error) => {
			setIsLoading(false)
			setIsOpen(false)
			return toast({
				title: error.message,
				description: 'Please try again',
				variant: 'destructive',
			})
		},
	})

	const createPathway = () => sendMessage({ message })

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
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

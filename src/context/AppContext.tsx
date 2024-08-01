import { useToast } from '@/components/ui/use-toast'
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
	setMessage: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<AppContextProps>({
	createPathway: () => {},
	message: '',
	handleInputChange: () => {},
	isLoading: false,
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
				throw new Error('Failed to send message')
			}

			return response.body
		},
		onSuccess: () => {
			setIsLoading(false)
			queryClient.invalidateQueries()
		},
		onMutate: () => {
			setIsLoading(true)
		},
		onSettled: () => {
			setIsLoading(false)
		},
		onError: () => {
			return toast({
				title: 'There was an error generating pathway',
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
				setMessage,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

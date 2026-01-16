'use client'

import { FC, useContext } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { buttonVariants } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { PlusIcon, MagicWandIcon } from '@radix-ui/react-icons'
import { AppContext } from '@/context/AppContext'
import { Loader2 } from 'lucide-react'
import GeneratePathwayLoadingDialog from './GeneratePathwayLoadingDialog'

interface GenerateButtonProps {}

const GenerateButton: FC<GenerateButtonProps> = ({}) => {
	const {
		createPathway,
		handleInputChange,
		isLoading,
		isOpen,
		setIsOpen,
		message,
		setMessage,
		difficulty,
		setDifficulty,
		currentStep,
		isRedirecting,
	} = useContext(AppContext)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v && !isLoading) {
					setIsOpen(v)
				}
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<button
					className={buttonVariants({
						size: 'dashboard',
						variant: 'hero',
						className: ' h-11 rounded-md px-5',
					})}
				>
					<PlusIcon className='mr-2 h-4 w-4' />
					Generate learning pathway
				</button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-lg border-[#27272A]'>
				{isLoading ? (
					<DialogHeader>
						<DialogTitle className='text-[#FAFAFA] text-lg'>
							<div className='flex items-center gap-3'>
								<MagicWandIcon className='w-5 h-5' />
								<span className='text-xl'>Generating pathway</span>
							</div>
						</DialogTitle>
						<DialogDescription className='text-[#A1A1AA]'>
							Creating your personalized learning pathway...
						</DialogDescription>
						<GeneratePathwayLoadingDialog
							currentStep={currentStep}
							isRedirecting={isRedirecting}
						/>
					</DialogHeader>
				) : (
					<>
						<DialogHeader>
							<DialogTitle className='text-[#FAFAFA] text-lg'>
								<span className='text-xl'>Generate learning pathway</span>
							</DialogTitle>
							<DialogDescription className='text-[#FAFAFA]'>
								Input what you want to learn and we&apos;ll generate a learning
								pathway for you.
							</DialogDescription>
						</DialogHeader>
						<div className='flex flex-col space-y-6 mt-2'>
							<div className='grid flex-1 gap-2'>
								<Label htmlFor='generate' className='text-[#FAFAFA] mb-1'>
									Name
								</Label>
								<Input
									id='generate'
									onChange={handleInputChange}
									disabled={isLoading}
									value={message}
									placeholder='What you want to learn'
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault()
											createPathway()
											setMessage('')
											setDifficulty('beginnerToIntermediate')
										}
									}}
									className='border-[#27272A] focus:border-[#FAFAFA]'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<Label className='text-[#FAFAFA] mb-1'>Difficulty</Label>

								<RadioGroup
									defaultValue='beginnerToIntermediate'
									className='text-[#FAFAFA]'
									disabled={isLoading}
									onValueChange={(value) => {
										value === 'beginnerToIntermediate'
											? setDifficulty('beginnerToIntermediate')
											: value === 'expert'
											? setDifficulty('expert')
											: setDifficulty('noPreference')
									}}
								>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='beginnerToIntermediate'
											id='r1'
											className='border-[#FAFAFA] text-[#FAFAFA]'
										/>
										<Label htmlFor='r1'>Beginner to Intermediate</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='expert'
											id='r2'
											className='border-[#FAFAFA] text-[#FAFAFA]'
										/>
										<Label htmlFor='r2'>Expert</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='noPreference'
											id='r3'
											className='border-[#FAFAFA] text-[#FAFAFA]'
										/>
										<Label htmlFor='r3'>No Preference</Label>
									</div>
								</RadioGroup>
							</div>
						</div>
						<DialogFooter className='flex items-center justify-between w-full mt-5'>
							<button
								type='submit'
								disabled={isLoading || !message.trim()}
								className={buttonVariants({
									size: 'dashboard',
									variant: 'hero',
									className: ' h-10 rounded-md px-5',
								})}
								onClick={() => {
									createPathway()
									setMessage('')
									setDifficulty('beginnerToIntermediate')
								}}
							>
								{isLoading ? <Loader2 className='animate-spin' /> : 'Generate'}
							</button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default GenerateButton

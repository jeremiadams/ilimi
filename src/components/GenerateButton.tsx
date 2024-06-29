'use client'

import { FC, useState } from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Button, buttonVariants } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { PlusIcon } from '@radix-ui/react-icons'

interface GenerateButtonProps {}

const GenerateButton: FC<GenerateButtonProps> = ({}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
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
				<DialogHeader>
					<DialogTitle className='text-[#FAFAFA] text-lg'>
						<span className=' text-xl'>Generate learning pathway</span>
					</DialogTitle>
					<DialogDescription className='text-[#FAFAFA]'>
						Input what you want to learn and we'll generate a learning pathway
						for you.
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Label htmlFor='generate' className='sr-only'>
							Generate learning pathway
						</Label>
						<Input
							id='generate'
							className='border-[#27272A] focus:border-[#FAFAFA]'
						/>
					</div>
					<button
						type='submit'
						className={buttonVariants({
							size: 'dashboard',
							variant: 'hero',
							className: ' h-10 rounded-md px-5',
						})}
					>
						Generate
					</button>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button
							type='button'
							size='dashboard'
							variant='hero'
							className='h-10 rounded-md px-5 bg-[#212124] hover:bg-[#18181b] text-[#FAFAFA] text-sm'
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default GenerateButton

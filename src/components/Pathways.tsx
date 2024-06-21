import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import { Button, buttonVariants } from './ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	return (
		<DashboardLayout>
			<div>
				<div className='flex justify-between items-center mb-5'>
					<h1 className=' font-medium text-lg'>Learning Pathways</h1>
					<Dialog>
						<DialogTrigger asChild>
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
									Input what you want to learn and we'll generate a learning
									pathway for you.
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
				</div>
				<div className='flex gap-5'>
					<Link
						href='#'
						className='flex flex-col gap-20 py-6 px-8 transition-all justify-between max-w-[800px] bg-[#09090b] border border-[#27272A] hover:bg-[#000] duration-500 rounded-lg'
					>
						<div className='flex flex-col gap-4'>
							<h3 className=' font-semibold text-2xl'>
								Learn <span>Basic Algebra</span>
							</h3>
							<p className=' line-clamp-3'>
								Improve your web development skills in a variety of languages
								and frameworks, including HTML, CSS, JavaScript, React,
								TypeScript, and cutting-edge methods in AI.
							</p>
						</div>
						<div className='flex flex-col'>
							<span className=''>Continue learning:</span>
							<span className='text-[#7058d0] underline underline-offset-2'>
								Module 3: Deal with it.
							</span>
						</div>
					</Link>
					<Link
						href='#'
						className='flex flex-col gap-20 py-6 px-8 transition-all justify-between max-w-[800px] bg-[#09090b] border border-[#27272A] hover:bg-[#000] duration-500 rounded-lg'
					>
						<div className='flex flex-col gap-4'>
							<h3 className=' font-semibold text-2xl'>
								Learn <span>Basic Algebra</span>
							</h3>
							<p className=' line-clamp-3'>
								Improve your web development skills in a variety of languages
								and frameworks, including HTML, CSS, JavaScript, React,
								TypeScript, and cutting-edge methods in AI.
							</p>
						</div>
						<div className='flex flex-col'>
							<span className=''>Continue learning:</span>
							<span className='text-[#7058d0] underline underline-offset-2'>
								Module 3: Deal with it.
							</span>
						</div>
					</Link>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Dashboard

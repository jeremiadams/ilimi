import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import { buttonVariants } from './ui/button'

interface QuizProps {}

//#f8bcbc
//rgb(148, 215, 162)

const Quiz: FC<QuizProps> = ({}) => {
	return (
		<DashboardLayout>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl'>Module 1 Quiz</h1>
					<p className='pt-4'>
						Kindly select the right answers from the following.
					</p>
				</div>
			</div>
			<div className='pt-10 flex flex-col gap-5'>
				<div className='flex flex-col gap-3'>
					<p className=' font-semibold text-lg'>
						Which animal was part of an Russian domestication experiment in
						1959?
					</p>
					<div className='flex gap-4'>
						<button
							className={buttonVariants({
								variant: 'outline',
								size: 'quiz',
								className:
									'rounded-xl bg-transparent hover:border-[#D6DBF5] hover:bg-[#D6DBF5]',
							})}
						>
							Alligators
						</button>
						<button
							className={buttonVariants({
								variant: 'outline',
								size: 'quiz',
								className:
									'rounded-xl bg-transparent hover:border-[#D6DBF5] hover:bg-[#D6DBF5]',
							})}
						>
							Foxes
						</button>
						<button
							className={buttonVariants({
								variant: 'outline',
								size: 'quiz',
								className:
									'rounded-xl bg-transparent hover:border-[#D6DBF5] hover:bg-[#D6DBF5]',
							})}
						>
							Bears
						</button>
						<button
							className={buttonVariants({
								variant: 'outline',
								size: 'quiz',
								className:
									'rounded-xl bg-transparent hover:border-[#D6DBF5] hover:bg-[#D6DBF5]',
							})}
						>
							Pigeons
						</button>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Quiz

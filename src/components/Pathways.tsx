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
import PathwayCard from './PathwayCard'
import GenerateButton from './GenerateButton'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	return (
		<DashboardLayout>
			<div>
				<div className='flex flex-col sm:flex-row justify-start gap-4 sm:gap-0 sm:justify-between sm:items-center mb-5'>
					<h1 className='font-medium text-xl sm:text-lg'>Learning Pathways</h1>
					<GenerateButton />
				</div>
				<div className='grid grid-rows-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
					<PathwayCard size='small' />
					<PathwayCard size='small' />
					<PathwayCard size='small' />
					{/* <PathwayCard size='small' /> */}
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Dashboard

'use client'

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
import { trpc } from '@/app/_trpc/client'
import { Skeleton } from './ui/skeleton'
import { Ghost } from 'lucide-react'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	const { data: pathways, isLoading } = trpc.getPathways.useQuery()

	return (
		<DashboardLayout>
			<div>
				<div className='flex flex-col sm:flex-row justify-start gap-4 sm:gap-0 sm:justify-between sm:items-center mb-5'>
					<h1 className='font-medium text-xl sm:text-lg'>Learning Pathways</h1>
					<GenerateButton />
				</div>
				{/* <PathwayCard size='small' />
					<PathwayCard size='small' />
					<PathwayCard size='small' /> */}
				{/* <PathwayCard size='small' /> */}
				{pathways && pathways.length > 0 ? (
					<div className='grid grid-rows-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
						{pathways.map((pathway) => (
							<PathwayCard
								size='big'
								id={pathway.id}
								key={pathway.id}
								title={pathway.title}
								description={pathway.description}
								status={pathway.pathwayStatus}
							/>
						))}
					</div>
				) : isLoading ? (
					<div className='flex justify-center mt-28 '>
						<div className='space-y-2'>
							<Skeleton className='h-5 w-[250px] bg-[#27272A]' />
							<Skeleton className='h-5 w-[200px] bg-[#27272A]' />
						</div>
					</div>
				) : (
					<div className=' w-full mt-28 flex justify-center text-white'>
						<div className='flex flex-col items-center'>
							<Ghost className='h-8 w-8 text-[#e389ba]' />
							<h3 className=' font-semibold text-xl mt-2'>
								No pathways generated.
							</h3>
							<p>Kindly click the generate button.</p>
						</div>
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}

export default Dashboard

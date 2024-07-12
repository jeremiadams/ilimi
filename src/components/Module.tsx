import Link from 'next/link'
import { FC } from 'react'
import { Badge } from './ui/badge'

interface ModuleProps {
	id: string
	title: string | null
	index: number
	isComplete: boolean
}

const Module: FC<ModuleProps> = ({ id, title, index, isComplete }) => {
	return (
		<Link
			href={`/dashboard/pathways/modules/${id}`}
			className='py-3 px-4 sm:py-6 sm:px-8 block transition-all max-w-[850px] bg-[#09090b] border border-[#27272A] hover:border-transparent hover:bg-[#000] hover:shadow-[0px_5px_8px_5px_#121216] duration-500 rounded-lg'
		>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-3'>
					<div className='hidden sm:flex h-12 shrink-0 bg-[#7058d0] px-4 text-black rounded-md font-medium justify-center items-center'>
						<span>{`Module ${index + 1}`}</span>
					</div>
					<span className=' font-semibold text-lg sm:text-xl line-clamp-2'>
						{title}
					</span>
				</div>
				<Badge
					variant={isComplete ? 'completed' : 'progress'}
					className='sm:ml-10 shrink-0'
				>
					{isComplete ? 'Completed' : 'In progress'}
				</Badge>
			</div>
		</Link>
	)
}

export default Module

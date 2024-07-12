import Link from 'next/link'
import { FC } from 'react'

interface PathwayCardProps {
	size: 'big' | 'small'
	title: string
	description: string
	id: string
	status: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
}

const PathwayCard: FC<PathwayCardProps> = ({
	size,
	title,
	description,
	id,
}) => {
	return (
		<Link
			href={`/dashboard/pathways/${id}`}
			className={`flex flex-col gap-20 py-5 sm:py-6 px-5 sm:px-8 transition-all justify-between bg-[#09090b] border border-[#27272A] hover:bg-[#000] duration-500 rounded-lg ${
				size === 'big' ? 'max-w-[800px]' : 'w-full'
			}`}
		>
			<div className='flex flex-col gap-4'>
				<h3 className=' font-semibold text-2xl'>
					Learn <span>{title}</span>
				</h3>
				<p className=' line-clamp-3'>
					{/* Improve your web development skills in a variety of languages and
					frameworks, including HTML, CSS, JavaScript, React, TypeScript, and
					cutting-edge methods in AI. */}
					{description}
				</p>
			</div>
			<div className='flex flex-col'>
				<span className=''>Continue learning:</span>
				<span className='text-[#7058d0] underline underline-offset-2'>
					Module 3: Deal with it.
				</span>
			</div>
		</Link>
	)
}

export default PathwayCard

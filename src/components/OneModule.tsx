import { FC } from 'react'
import DashboardLayout from './DashboardNav'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { trpc } from '@/app/_trpc/client'
import { db } from '@/db'
import { useQueryClient } from '@tanstack/react-query'
import ModuleNavBtns from './ModuleNavBtns'

interface OneModuleProps {
	id: string
	title: string | null
	description: string | null
	content: string | null
	pathwayId: string | null
	firstModuleId: string | undefined
	lastModuleId: string | undefined
	prevPageId: string
	nextPageId: string
}

const OneModule: FC<OneModuleProps> = async ({
	id,
	title,
	description,
	content,
	pathwayId,
	firstModuleId,
	lastModuleId,
	prevPageId,
	nextPageId,
}) => {
	const nextModule = await db.module.findFirst({
		where: {
			id: nextPageId,
			pathwayId,
		},
	})

	return (
		<>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
					<p className='pt-4'>{description}</p>
				</div>
			</div>
			<div className='pt-10'>
				<ReactMarkdown
					className={cn(
						`prose prose-white prose-p:text-white prose-headings:text-white prose-ol:text-white prose-ul:text-white prose-strong:text-white prose-a:text-[#7058d0] prose-code:text-[#f5cbb6]`
					)}
				>
					{content}
				</ReactMarkdown>
				<ModuleNavBtns
					id={id}
					pathwayId={pathwayId}
					firstModuleId={firstModuleId}
					lastModuleId={lastModuleId}
					prevPageId={prevPageId}
					nextPageId={nextPageId}
					nextModuleContent={nextModule?.content ? true : false}
				/>
			</div>
		</>
	)
}

export default OneModule

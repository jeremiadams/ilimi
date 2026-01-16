import { FC } from 'react'
import { db } from '@/db'
import ModuleNavBtns from './ModuleNavBtns'
import MarkdownContent from './MarkdownContent'

interface OneModuleProps {
	id: string
	title: string | null
	content: string | null
	moduleId: string | null
	pathwayId: string | null | undefined
	firstSectionId: string | undefined
	lastSectionId: string | undefined
	prevPageId: string
	nextPageId: string
}

const OneModule: FC<OneModuleProps> = async ({
	id,
	title,
	content,
	moduleId,
	pathwayId,
	firstSectionId,
	lastSectionId,
	prevPageId,
	nextPageId,
}) => {
	const nextSection = await db.section.findFirst({
		where: {
			id: nextPageId,
			moduleId,
		},
	})

	return (
		<>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
				</div>
			</div>
			<div className='pt-10'>
				<MarkdownContent content={content} />
				<ModuleNavBtns
					id={id}
					moduleId={moduleId}
					pathwayId={pathwayId}
					firstSectionId={firstSectionId}
					lastSectionId={lastSectionId}
					prevPageId={prevPageId}
					nextPageId={nextPageId}
					nextModuleContent={nextSection?.content ? true : false}
				/>
			</div>
		</>
	)
}

export default OneModule

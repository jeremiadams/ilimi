'use client'

import { FC } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import Section from './Section'
import { SectionsType } from '@/lib/types/Modules'

interface ModuleProps {
	id: string
	title: string | null
	index: number
	generateContent: ({
		moduleTitle,
		moduleNumber,
		sectionId,
		sectionTitle,
		moduleId,
		difficulty,
	}: {
		moduleTitle: string
		moduleNumber: string
		sectionId: string
		sectionTitle: string
		moduleId: string
		difficulty: string
	}) => void
	progress: number
	contentPreview: string
	isLoading: boolean
	isRedirecting: boolean
	sections: SectionsType[]
	difficulty: string
}

const Module: FC<ModuleProps> = ({
	id,
	title,
	index,
	generateContent,
	progress,
	contentPreview,
	isLoading,
	isRedirecting,
	sections,
	difficulty,
}) => {
	return (
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='item-1' className=' border-none'>
				<AccordionTrigger className=' hover:no-underline py-0 block '>
					<div className=' cursor-pointer py-3 px-4 sm:py-6 sm:px-8 block transition-all max-w-[850px] bg-[#09090b] border border-[#27272A] hover:border-transparent hover:bg-[#000] hover:shadow-[0px_5px_8px_5px_#121216] duration-500 rounded-lg'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<div className='hidden sm:flex h-12 shrink-0 bg-[#7058d0] px-4 text-black rounded-md font-medium justify-center items-center'>
									<span>{`Module ${index + 1}`}</span>
								</div>
								<span className='text-left font-semibold text-lg sm:text-xl line-clamp-2'>
									{title}
								</span>
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className='ml-8 flex flex-col gap-2 mt-2'>
					{sections.map((item: any) => (
						<Section
							key={item.id}
							id={item.id}
							title={item.title}
							index={index}
							moduleTitle={title}
							moduleId={id}
							pathwayStatus={item.pathwayStatus}
							generateContent={generateContent}
							progress={progress}
							contentPreview={contentPreview}
							isLoading={isLoading}
							isRedirecting={isRedirecting}
							difficulty={difficulty}
						/>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default Module

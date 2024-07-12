import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import Module from './Module'

interface Modules {
	id: string
	title: string | null
	isComplete: boolean
}

interface OnePathwayProps {
	title: string
	description: string
	modules: Modules[]
}

const OnePathway: FC<OnePathwayProps> = ({ title, description, modules }) => {
	return (
		<DashboardLayout>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
					<p className='pt-4'>
						{/* Improve your web development skills in a variety of languages and
						frameworks, including HTML, CSS, JavaScript, React, TypeScript, and
						cutting-edge methods in AI. */}
						{description}
					</p>
				</div>
			</div>
			<div className='pt-10 flex flex-col gap-5'>
				{modules.map((item, ind) => (
					<Module
						id={item.id}
						key={item.id}
						index={ind}
						title={item.title}
						isComplete={item.isComplete}
					/>
				))}
			</div>
		</DashboardLayout>
	)
}

export default OnePathway

import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import Module from './Module'

interface OnePathwayProps {}

const OnePathway: FC<OnePathwayProps> = ({}) => {
	return (
		<DashboardLayout>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl'>Learn Basic Algebra</h1>
					<p className='pt-4'>
						Improve your web development skills in a variety of languages and
						frameworks, including HTML, CSS, JavaScript, React, TypeScript, and
						cutting-edge methods in AI.
					</p>
				</div>
			</div>
			<div className='pt-10 flex flex-col gap-5'>
				<Module />
				<Module />
				<Module />
				<Module />
			</div>
		</DashboardLayout>
	)
}

export default OnePathway

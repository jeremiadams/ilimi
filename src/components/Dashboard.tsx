import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import PathwayCard from './PathwayCard'
import GenerateButton from './GenerateButton'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	return (
		<DashboardLayout>
			<div>
				<div className='flex flex-col sm:flex-row justify-start gap-4 sm:gap-0 sm:justify-between sm:items-center mb-5'>
					<h1 className=' font-medium text-xl sm:text-lg'>Overview</h1>
					<GenerateButton />
				</div>
				<div className='flex gap-5 flex-wrap lg:flex-nowrap'>
					<PathwayCard size='big' />
					<PathwayCard size='big' />
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Dashboard

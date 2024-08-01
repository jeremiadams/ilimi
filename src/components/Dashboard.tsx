'use client'

import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import PathwayCard from './PathwayCard'
import GenerateButton from './GenerateButton'
import { trpc } from '@/app/_trpc/client'
import Loading from './Loading'
import { Ghost } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { db } from '@/db'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	const { data: pathways, isLoading } = trpc.getPathways.useQuery()
	console.log(pathways)

	// const main = async () => {
	// 	const pathway = await db.pathway.create({
	// 		data: {
	// 			title: 'testing',
	// 			description: 'testing it',
	// 			userId: 'kp_c56cab8c0e194792b671724ad34e62e8',
	// 			Module: {
	// 				createMany: {
	// 					data: [
	// 						{ title: 'yo', description: 'yoyo' },
	// 						{ title: 'mo', description: 'momo' },
	// 					],
	// 				},
	// 			},
	// 		},
	// 	})

	// 	console.log(pathway)
	// }
	// main()

	return (
		<DashboardLayout>
			<div>
				<div className='flex flex-col sm:flex-row justify-start gap-4 sm:gap-0 sm:justify-between sm:items-center mb-5'>
					<h1 className=' font-medium text-xl sm:text-lg'>Overview</h1>
					<GenerateButton />
				</div>
				{pathways && pathways.length > 0 ? (
					<div className='flex gap-5 flex-wrap lg:flex-nowrap'>
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

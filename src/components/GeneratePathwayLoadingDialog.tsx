'use client'

import { FC } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'

interface GeneratePathwayLoadingDialogProps {
	currentStep: number
	isRedirecting: boolean
}

const steps = [
	{ id: 1, label: 'Validating your input' },
	{ id: 2, label: 'Generating course outline' },
	{ id: 3, label: 'Creating your pathway' },
]

const GeneratePathwayLoadingDialog: FC<GeneratePathwayLoadingDialogProps> = ({
	currentStep,
	isRedirecting,
}) => {
	return (
		<div className='flex flex-col gap-3 py-4'>
			{steps.map((step) => {
				const isCompleted = currentStep > step.id
				const isActive = currentStep === step.id

				return (
					<div key={step.id} className='flex items-center gap-3'>
						{isCompleted ? (
							<CheckCircledIcon className='w-[18px] h-[18px] text-green-500' />
						) : isActive ? (
							<Loader2 className='w-[18px] h-[18px] text-[#7058d0] animate-spin' />
						) : (
							<CircleProgressBar
								percentage={0}
								size={16}
								strokeWidth={1.5}
								color='#27272A'
							/>
						)}
						<span
							className={
								isCompleted || isActive
									? 'text-[#FAFAFA] font-medium'
									: 'text-[#52525B] font-medium'
							}
						>
							{step.label}
						</span>
					</div>
				)
			})}
			{isRedirecting && (
				<div className='flex items-center gap-3 mt-2'>
					<Loader2 className='w-[18px] h-[18px] text-[#e389ba] animate-spin' />
					<span className='text-[#FAFAFA] font-medium'>
						Redirecting to your pathway...
					</span>
				</div>
			)}
		</div>
	)
}

export default GeneratePathwayLoadingDialog

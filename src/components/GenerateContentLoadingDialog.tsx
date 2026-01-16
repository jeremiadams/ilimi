'use client'

import { FC } from 'react'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'

interface GenerateContentLoadingDialogProps {
	progress: number
	isRedirecting: boolean
	contentPreview?: string
}

const GenerateContentLoadingDialog: FC<GenerateContentLoadingDialogProps> = ({
	progress,
	isRedirecting,
	contentPreview,
}) => {
	const isComplete = progress >= 100

	return (
		<div className='flex flex-col gap-3 py-2'>
			<div className='flex items-center gap-3'>
				{isComplete ? (
					<CheckCircledIcon className='w-[18px] h-[18px] text-green-500' />
				) : (
					<Loader2 className='w-[18px] h-[18px] text-[#7058d0] animate-spin' />
				)}
				<span
					className={
						isComplete
							? 'text-green-500 font-medium'
							: 'text-[#FAFAFA] font-medium'
					}
				>
					{isComplete ? 'Content generated' : 'Generating content...'}
				</span>
			</div>

			{/* Progress bar */}
			<div className='w-full bg-[#27272A] rounded-full h-2 overflow-hidden'>
				<div
					className='bg-gradient-to-r from-[#7058d0] to-[#e389ba] h-2 rounded-full transition-all duration-300 ease-out'
					style={{ width: `${Math.min(progress, 100)}%` }}
				/>
			</div>

			{/* Content preview */}
			{contentPreview && (
				<div className='mt-2 p-3 bg-[#18181B] rounded-md border border-[#27272A] max-h-32 overflow-hidden'>
					<p className='text-sm text-[#A1A1AA] line-clamp-3'>
						{contentPreview}
					</p>
				</div>
			)}

			{isRedirecting && (
				<div className='flex items-center gap-3 mt-2'>
					<Loader2 className='w-[18px] h-[18px] text-[#e389ba] animate-spin' />
					<span className='text-[#FAFAFA] font-medium'>
						Redirecting to your content...
					</span>
				</div>
			)}
		</div>
	)
}

export default GenerateContentLoadingDialog

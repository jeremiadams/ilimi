'use client'

import { FC } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'

interface GenerateContentLoadingDialogProps {
	streamData: { streamId: number; content: string }[]
	progressFirst: number
	progressSecond: number
	progressThird: number
	isRedirecting: boolean
}

const GenerateContentLoadingDialog: FC<GenerateContentLoadingDialogProps> = ({
	streamData,
	progressFirst,
	progressSecond,
	progressThird,
	isRedirecting,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2'>
				{progressFirst === 100 ? (
					<CheckCircledIcon className=' w-[17px] h-[17px] text-green-500' />
				) : (
					<CircleProgressBar
						percentage={progressFirst}
						size={15}
						strokeWidth={1.5}
						color='#7058d0'
					/>
				)}
				<div>
					<span
						className={
							progressFirst === 0
								? ' text-[#27272A] font-semibold'
								: ' text-[#FAFAFA] font-semibold '
						}
					>
						Generating content
					</span>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				{progressSecond === 100 ? (
					<CheckCircledIcon className=' w-[17px] h-[17px] text-green-500' />
				) : (
					<CircleProgressBar
						percentage={progressSecond}
						size={15}
						strokeWidth={1.5}
						color='#7058d0'
					/>
				)}
				<div>
					<span
						className={
							progressSecond === 0 && progressFirst < 100
								? ' text-[#27272A] font-semibold'
								: ' text-[#FAFAFA] font-semibold '
						}
					>
						Refining content
					</span>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				{progressThird === 100 ? (
					<CheckCircledIcon className=' w-[17px] h-[17px] text-green-500' />
				) : (
					<CircleProgressBar
						percentage={progressThird}
						size={15}
						strokeWidth={1.5}
						color='#7058d0'
					/>
				)}
				<div>
					<span
						className={
							progressThird === 0 && progressFirst < 100 && progressSecond < 100
								? ' text-[#27272A] font-semibold'
								: ' text-[#FAFAFA] font-semibold '
						}
					>
						Evaluating content
					</span>
				</div>
			</div>
			{isRedirecting && (
				<div className='flex items-center gap-2'>
					<Loader2 className='w-[17px] h-[17px] text-[#e389ba] animate-spin' />
					<span className='text-[#FAFAFA] font-semibold'>Redirecting...</span>
				</div>
			)}
		</div>
	)
}

export default GenerateContentLoadingDialog

import { FC } from 'react'

interface CircleProgressBarProps {
	percentage: number
	size: number
	strokeWidth: number
	color?: string
	backgroundColor?: string
}

const CircleProgressBar: FC<CircleProgressBarProps> = ({
	percentage,
	size = 100,
	strokeWidth = 10,
	color = '#4caf50',
	backgroundColor = '#e0e0e0',
}) => {
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (percentage / 100) * circumference

	return (
		<svg width={size} height={size}>
			{/* Background Circle */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill='none'
				stroke='transparent'
				strokeWidth={strokeWidth}
			/>

			{/* Progress Circle */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill='none'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap='round'
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
			/>
		</svg>
	)
}

export default CircleProgressBar

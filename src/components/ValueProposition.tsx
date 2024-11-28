'use client'
import { FC } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { animate, motion, Variants } from 'framer-motion'

interface ValuePropositionProps {}

interface Props {
	heading: string
	text: string
	color: string
	index: number
}

const cardVariants: Variants = {
	offscreen: {
		y: 300,
	},
	onscreen: {
		y: 50,
		rotate: -10,
		transition: {
			type: 'spring',
			bounce: 0.4,
			duration: 0.8,
			delayChildren: 2,
		},
	},
}

const food: [string, string, string][] = [
	['Sign up', '#F5CBB6', 'Start out with a free plan or choose our plan.'],
	[
		'Generate pathway',
		'#80CDE7',
		'Enter any topic to learn and generate content.',
	],
	['Start learning', '#CA99E9', 'Start learning and generating quizzes now!'],
]

function Card({ text, color, index, heading }: Props) {
	const background = `bg-gradient-to-r from-[${color}] to-blue-500`

	return (
		<motion.div
			className='flex items-center justify-center relative md:mb-[-40px] lg:mb-[-120px] pt-5'
			initial='offscreen'
			whileInView='onscreen'
			viewport={{ once: false, amount: 0.2 }}
		>
			<motion.div
				className={`w-[300px] p-10 flex flex-col gap-2 rounded-[20px]`}
				style={{
					backgroundImage: `url(data:image/png;base64,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)`,
					backgroundColor: `${color}`,
					// backgroundBlendMode: 'overlay',
				}}
				variants={cardVariants}
			>
				<p className=' text-3xl font-bold'>{index + 1}.</p>
				<h3 className=' text-xl font-semibold text-[#190028]'>{heading}</h3>
				<p className=' '>{text}</p>
			</motion.div>
		</motion.div>
	)
}

const ValueProposition: FC<ValuePropositionProps> = ({}) => {
	return (
		<MaxWidthWrapper className='pb-12 pt-28 sm:pt-40 relative z-10 '>
			<div className='flex flex-col items-center'>
				<motion.h2
					className='max-w-4xl text-4xl text-center font-bold md:text-4xl lg:text-5xl text-white tracking-tighter leading-[1]'
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 2,
						ease: 'easeInOut',
					}}
				>
					Personalize your learning
				</motion.h2>
				<motion.p
					className=' mt-5 max-w-xl text-center sm:text-2xl text-gray-300'
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 2,
						ease: 'easeInOut',
					}}
				>
					Block out the noise. Learn any concept you want now!
				</motion.p>
			</div>

			<div className=' flex flex-wrap gap-2 md:gap-10 justify-center pb-28 md:pb-52 overflow-hidden'>
				{food.map(([heading, color, text], ind) => (
					<Card
						heading={heading}
						color={color}
						key={heading}
						text={text}
						index={ind}
					/>
				))}
			</div>
		</MaxWidthWrapper>
	)
}

export default ValueProposition

import { FC } from 'react'
import { motion } from 'framer-motion'

interface SplitTextProps {
	children: any
	initial: any
	variants: any
	animate: any
	className: any
}

const SplitText: FC<SplitTextProps> = ({ children, ...rest }) => {
	const words = children.split(' ')
	return words.map((word: any, i: any) => {
		return (
			<div
				key={children + i}
				style={{
					display: 'inline-block',
					overflow: 'hidden',
					paddingRight: '0.5px',
				}}
			>
				<motion.div
					{...rest}
					style={{ display: 'inline-block', willChange: 'transform' }}
					custom={i}
				>
					{word + (i !== words.length - 1 ? '\u00A0' : '')}
				</motion.div>
			</div>
		)
	})
}

export default SplitText

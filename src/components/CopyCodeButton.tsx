'use client'
import { CopyIcon } from '@radix-ui/react-icons'
import { FC, useState } from 'react'

interface CopyCodeButtonProps {
	code: any
}

const CopyCodeButton: FC<CopyCodeButtonProps> = ({ code }) => {
	const [isCopied, setIsCopied] = useState<boolean>(false)
	const handleCopy = (code: string) => {
		navigator.clipboard.writeText(code).then(() => {
			// alert('Code copied to clipboard!')
			setIsCopied(true)
			const copyTimeout = setTimeout(() => {
				setIsCopied(false)
			}, 2000)
			// clearTimeout(copyTimeout)
		})
	}
	return (
		<button
			onClick={() => handleCopy(code)}
			className='absolute right-2 top-2 flex gap-2 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white hover:bg-gray-700'
		>
			{!isCopied && <CopyIcon className=' w-4 h-4' />}
			<span>{isCopied ? 'Copied!' : 'Copy'}</span>
		</button>
	)
}

export default CopyCodeButton

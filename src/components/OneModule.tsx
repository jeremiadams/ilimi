import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface OneModuleProps {
	title: string | null
	description: string | null
	content: string | null
}

const OneModule: FC<OneModuleProps> = ({ title, description, content }) => {
	return (
		<DashboardLayout>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
					<p className='pt-4'>
						{/* Improve your web development skills in a variety of languages and
						frameworks, including HTML, CSS, JavaScript, React, TypeScript, and
						cutting-edge methods in AI. */}
						{description}
					</p>
				</div>
			</div>
			<div className='pt-10'>
				{/* <p>{content}</p> */}
				<ReactMarkdown
					className={cn(
						`prose prose-white prose-p:text-white prose-headings:text-white prose-ol:text-white prose-ul:text-white prose-strong:text-white prose-a:text-[#7058d0] prose-code:text-[#f5cbb6]`
					)}
				>
					{content}
				</ReactMarkdown>
			</div>
		</DashboardLayout>
	)
}

export default OneModule

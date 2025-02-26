import { FC } from 'react'
import DashboardLayout from './DashboardNav'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { trpc } from '@/app/_trpc/client'
import { db } from '@/db'
import { useQueryClient } from '@tanstack/react-query'
import ModuleNavBtns from './ModuleNavBtns'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyCodeButton from './CopyCodeButton'

interface OneModuleProps {
	id: string
	title: string | null
	// description: string | null
	content: string | null
	moduleId: string | null
	pathwayId: string | null | undefined
	firstSectionId: string | undefined
	lastSectionId: string | undefined
	prevPageId: string
	nextPageId: string
}

const OneModule: FC<OneModuleProps> = async ({
	id,
	title,
	// description,
	content,
	moduleId,
	pathwayId,
	firstSectionId,
	lastSectionId,
	prevPageId,
	nextPageId,
}) => {
	const nextSection = await db.section.findFirst({
		where: {
			id: nextPageId,
			moduleId,
		},
	})

	const handleCopy = (code: string) => {
		navigator.clipboard.writeText(code).then(() => {
			alert('Code copied to clipboard!')
		})
	}

	return (
		<>
			<div className='pb-10 border-b border-[#27272A]'>
				<div className=' max-w-[850px]'>
					<h1 className='font-medium text-4xl capitalize'>{title}</h1>
					{/* <p className='pt-4'>{description}</p> */}
				</div>
			</div>
			<div className='pt-10'>
				<ReactMarkdown
					className={cn(
						`prose prose-white prose-p:text-white prose-headings:text-white prose-ol:text-white prose-ul:text-white prose-strong:text-white prose-a:text-[#7058d0] prose-code:text-[#f5cbb6]`
					)}
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={{
						table: ({ children }) => (
							<div className='overflow-hidden rounded-lg border border-[#555555]'>
								<table className='w-full text-left text-sm my-0'>
									{children}
								</table>
							</div>
						),
						th: ({ children }) => (
							<th className='bg-[#383838] border border-[#555555] px-4 py-2 font-bold text-white'>
								{children}
							</th>
						),
						td: ({ children }) => (
							<td className='border border-[#555555] px-4 py-2 text-white'>
								{children}
							</td>
						),
						tr: ({ children, node }) => <tr className={``}>{children}</tr>,
						caption: ({ children }) => (
							<caption className='text-lg font-semibold text-white my-2'>
								{children}
							</caption>
						),
						code({
							node,
							inline,
							className,
							children,
							...props
						}: {
							node?: any
							inline?: any
							className?: any
							children?: any
						}) {
							const match = /language-(\w+)/.exec(className || '')
							const code = String(children).trim()

							if (inline) {
								return (
									<code
										className='rounded bg-gray-200 px-1 py-0.5 font-mono text-sm text-red-500'
										{...props}
									>
										{children}
									</code>
								)
							}

							return (
								<div className='relative my-4'>
									<CopyCodeButton code={code} />
									<SyntaxHighlighter
										language={match ? match[1] : undefined}
										style={vscDarkPlus}
										customStyle={{
											padding: '1rem',
											borderRadius: '0.5rem',
											fontSize: '0.875rem',
										}}
										{...props}
									>
										{code}
									</SyntaxHighlighter>
								</div>
							)
						},
						a: ({ href, children }) => {
							// Ensure links are valid
							const validHref = href?.startsWith('http')
								? href
								: `http://${href}`
							return (
								<a href={validHref} target='_blank' rel='noopener noreferrer'>
									{children}
								</a>
							)
						},
					}}
				>
					{content}
				</ReactMarkdown>
				<ModuleNavBtns
					id={id}
					moduleId={moduleId}
					pathwayId={pathwayId}
					firstSectionId={firstSectionId}
					lastSectionId={lastSectionId}
					prevPageId={prevPageId}
					nextPageId={nextPageId}
					nextModuleContent={nextSection?.content ? true : false}
				/>
			</div>
		</>
	)
}

export default OneModule

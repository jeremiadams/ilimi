'use client'

import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyCodeButton from './CopyCodeButton'

interface MarkdownContentProps {
	content: string | null
}

const MarkdownContent: FC<MarkdownContentProps> = ({ content }) => {
	if (!content) return null

	return (
		<ReactMarkdown
			className={cn(
				`prose prose-white prose-p:text-white prose-headings:text-white prose-ol:text-white prose-ul:text-white prose-strong:text-white prose-a:text-[#7058d0] prose-code:text-[#f5cbb6]`
			)}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				table: ({ children }) => (
					<div className='overflow-hidden rounded-lg border border-[#555555]'>
						<table className='w-full text-left text-sm my-0'>{children}</table>
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
				tr: ({ children }) => <tr>{children}</tr>,
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
					const language = match ? match[1] : undefined

					// Handle inline code
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

					// Handle code blocks (mermaid diagrams disabled for now)
					return (
						<div className='relative my-4'>
							<CopyCodeButton code={code} />
							<SyntaxHighlighter
								language={language}
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
					const validHref = href?.startsWith('http') ? href : `http://${href}`
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
	)
}

export default MarkdownContent

'use client'

import { FC, useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
	chart: string
}

// Initialize mermaid with dark theme and suppress errors
mermaid.initialize({
	startOnLoad: false,
	theme: 'dark',
	suppressErrorRendering: true,
	logLevel: 'fatal',
	themeVariables: {
		primaryColor: '#7058d0',
		primaryTextColor: '#FAFAFA',
		primaryBorderColor: '#27272A',
		lineColor: '#A1A1AA',
		secondaryColor: '#e389ba',
		tertiaryColor: '#18181B',
		background: '#09090b',
		mainBkg: '#18181B',
		nodeBorder: '#27272A',
		clusterBkg: '#18181B',
		clusterBorder: '#27272A',
		titleColor: '#FAFAFA',
		edgeLabelBackground: '#18181B',
	},
	flowchart: {
		htmlLabels: true,
		curve: 'basis',
	},
})

const MermaidDiagram: FC<MermaidDiagramProps> = ({ chart }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [svg, setSvg] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const renderChart = async () => {
			if (!containerRef.current || !chart) return

			try {
				// Generate unique ID for this diagram
				const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

				const { svg } = await mermaid.render(id, chart)
				setSvg(svg)
				setError(null)
			} catch (err) {
				console.error('Mermaid rendering error:', err)
				setError('Failed to render diagram')
			}
		}

		renderChart()
	}, [chart])

	// Hide failed diagrams silently - don't show error to user
	if (error || !svg) {
		return null
	}

	return (
		<div
			ref={containerRef}
			className='my-4 p-4 bg-[#18181B] border border-[#27272A] rounded-lg overflow-x-auto flex justify-center'
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	)
}

export default MermaidDiagram

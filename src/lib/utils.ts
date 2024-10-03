import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function shuffleArray(array: any) {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}

export function absoluteUrl(path: string) {
	if (typeof window !== undefined) return path
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}${path}`
	}
	return `https://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
	title = 'ilimi | Generate learning pathways in seconds',
	description = 'ilimi is a software that helps users generate learning pathways, course content and quizzez with A.I',
	image = '/ilimi-opengraph.png',
	icons = '/favicon.ico',
	noIndex = false,
}: {
	title?: string
	description?: string
	image?: string
	icons?: string
	noIndex?: boolean
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
		icons,
		metadataBase: new URL('https://edu-ai-one.vercel.app'),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	}
}

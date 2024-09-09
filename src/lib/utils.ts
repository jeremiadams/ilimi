import { type ClassValue, clsx } from 'clsx'
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

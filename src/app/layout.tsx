import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

const inter = Inter({
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
	subsets: ['latin'],
})

const opensans = Open_Sans({
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-opensans',
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Providers>
				<body
					className={cn(
						' min-h-screen font-sans antialiased grainy',
						inter.variable,
						opensans.variable,
						'font-inter'
					)}
				>
					{children}
				</body>
			</Providers>
		</html>
	)
}

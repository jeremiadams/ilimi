import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { AppContextProvider } from '@/context/AppContext'
import Script from 'next/script'

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

export const metadata = constructMetadata()

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<Script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				></Script>
				<Script id='google-analytics'>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
					`}
				</Script>
			</head>
			<Providers>
				<AppContextProvider>
					<body
						className={cn(
							' min-h-screen font-sans antialiased grainy',
							inter.variable,
							opensans.variable,
							'font-inter'
						)}
					>
						{children}
						<Toaster />
					</body>
				</AppContextProvider>
			</Providers>
		</html>
	)
}

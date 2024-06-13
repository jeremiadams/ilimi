'use client'
import { FC, useState, useEffect } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { buttonVariants } from './ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		const handleScroll = (event: any) => {
			setScroll(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	return (
		<nav
			className={`sticky py-4 inset-x-0 top-0 z-30 w-full bg-black/80 backdrop-blur-lg ${
				scroll !== 0 ? 'border-b border-gray-900' : ''
			}`}
		>
			<MaxWidthWrapper>
				<div className='flex h-16 justify-between items-center'>
					<Link href='/' className='flex z-40 text-lg font-semibold text-white'>
						<span>ilimi.</span>
					</Link>

					<div className='hidden items-center space-x-2 sm:flex'>
						<>
							<Link
								href='/pricing'
								className={buttonVariants({
									size: 'hero',
									variant: 'hero',
									className: 'bg-transparent text-white hover:text-[#9a7eb2]',
								})}
							>
								Pricing
							</Link>

							<LoginLink
								className={buttonVariants({
									size: 'nav',
									variant: 'hero',
									className: ' bg-transparent hover:bg-[#1e1922] text-white',
								})}
							>
								Sign in
							</LoginLink>

							<RegisterLink
								className={buttonVariants({
									size: 'nav',
									variant: 'hero',
									className: ' bg-[#1e1922] hover:bg-[#312a37] text-white',
								})}
							>
								Sign up <ArrowRightIcon className='ml-2 h-4 w-4' />
							</RegisterLink>
						</>
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	)
}

export default Navbar

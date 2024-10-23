'use client'
import { FC, useState, useEffect } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Button, buttonVariants } from './ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { motion } from 'framer-motion'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'

interface NavbarProps {}

const svgVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
}

const pathVariants = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 2,
			ease: 'easeInOut',
		},
	},
}

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
						<motion.svg
							width='67'
							height='18'
							viewBox='0 0 67 18'
							fill='currentColor'
							xmlns='http://www.w3.org/2000/svg'
							variants={svgVariants}
							initial='hidden'
							animate='visible'
						>
							<motion.path
								d='M3.64269 0.682861C2.92223 0.682861 2.21796 0.896501 1.61892 1.29676C1.01988 1.69703 0.552991 2.26594 0.277285 2.93155C0.00157832 3.59716 -0.070559 4.32959 0.0699948 5.0362C0.210549 5.74281 0.557481 6.39188 1.06692 6.90131C1.57636 7.41075 2.22542 7.75769 2.93203 7.89824C3.63865 8.03879 4.37107 7.96666 5.03668 7.69095C5.70229 7.41524 6.2712 6.94835 6.67147 6.34931C7.07173 5.75028 7.28537 5.046 7.28537 4.32555C7.28537 3.35945 6.90159 2.43292 6.21845 1.74978C5.53532 1.06664 4.60879 0.682861 3.64269 0.682861ZM3.64269 5.53977C3.40253 5.53977 3.16778 5.46856 2.9681 5.33514C2.76842 5.20172 2.61279 5.01208 2.52089 4.79021C2.42898 4.56834 2.40494 4.3242 2.45179 4.08866C2.49864 3.85313 2.61428 3.63677 2.7841 3.46696C2.95391 3.29714 3.17026 3.1815 3.4058 3.13465C3.64134 3.0878 3.88548 3.11184 4.10735 3.20375C4.32922 3.29565 4.51886 3.45128 4.65228 3.65096C4.7857 3.85064 4.85691 4.08539 4.85691 4.32555C4.85691 4.64758 4.72899 4.95642 4.50128 5.18414C4.27356 5.41185 3.96472 5.53977 3.64269 5.53977Z'
								fill='white'
								variants={pathVariants}
							/>
							<motion.path
								d='M16.6955 11.0038C17.0175 11.0038 17.3264 10.8759 17.5541 10.6482C17.7818 10.4205 17.9097 10.1116 17.9097 9.78959V6.9058C17.9099 6.03762 17.6124 5.19563 17.0668 4.52032C16.5211 3.84502 15.7604 3.37724 14.9116 3.19504C14.0627 3.01284 13.1771 3.12724 12.4024 3.51915C11.6277 3.91105 11.0108 4.55677 10.6547 5.34855L6.55973 14.4553C6.43193 14.742 6.20928 14.9759 5.92925 15.1177C5.64922 15.2596 5.32888 15.3006 5.02213 15.234C4.71539 15.1674 4.44094 14.9971 4.24497 14.7519C4.049 14.5067 3.94345 14.2015 3.9461 13.8876V11.0038C3.9461 10.6818 3.81817 10.3729 3.59046 10.1452C3.36275 9.91751 3.0539 9.78959 2.73187 9.78959C2.40983 9.78959 2.10099 9.91751 1.87328 10.1452C1.64557 10.3729 1.51764 10.6818 1.51764 11.0038V13.8876C1.51746 14.7558 1.815 15.5978 2.36062 16.2731C2.90624 16.9484 3.66693 17.4162 4.51578 17.5984C5.36463 17.7806 6.25029 17.6662 7.02498 17.2743C7.79967 16.8823 8.41654 16.2366 8.77266 15.4448L12.8676 6.33814C12.9954 6.05144 13.2181 5.81749 13.4981 5.67567C13.7782 5.53384 14.0985 5.49278 14.4052 5.55941C14.712 5.62603 14.9864 5.79626 15.1824 6.04147C15.3784 6.28668 15.4839 6.59191 15.4813 6.9058V9.78959C15.4813 10.1116 15.6092 10.4205 15.8369 10.6482C16.0646 10.8759 16.3735 11.0038 16.6955 11.0038Z'
								fill='white'
								variants={pathVariants}
							/>
							<motion.path
								d='M23.3885 17.6829V5.13743H26.8679V17.6829H23.3885ZM25.1364 3.52024C24.6191 3.52024 24.1753 3.34872 23.805 3.00568C23.4402 2.6572 23.2578 2.24065 23.2578 1.75604C23.2578 1.27687 23.4402 0.865767 23.805 0.522728C24.1753 0.174243 24.6191 0 25.1364 0C25.6536 0 26.0947 0.174243 26.4595 0.522728C26.8298 0.865767 27.0149 1.27687 27.0149 1.75604C27.0149 2.24065 26.8298 2.6572 26.4595 3.00568C26.0947 3.34872 25.6536 3.52024 25.1364 3.52024Z'
								fill='white'
								variants={pathVariants}
							/>
							<motion.path
								d='M33.1345 0.955611V17.6829H29.6551V0.955611H33.1345Z'
								fill='white'
								variants={pathVariants}
							/>
							<motion.path
								d='M35.9217 17.6829V5.13743H39.4011V17.6829H35.9217ZM37.6696 3.52024C37.1523 3.52024 36.7085 3.34872 36.3382 3.00568C35.9734 2.6572 35.791 2.24065 35.791 1.75604C35.791 1.27687 35.9734 0.865767 36.3382 0.522728C36.7085 0.174243 37.1523 0 37.6696 0C38.1868 0 38.6279 0.174243 38.9927 0.522728C39.363 0.865767 39.5481 1.27687 39.5481 1.75604C39.5481 2.24065 39.363 2.6572 38.9927 3.00568C38.6279 3.34872 38.1868 3.52024 37.6696 3.52024Z'
								fill='white'
								variants={pathVariants}
							/>
							<motion.path
								d='M42.1883 17.6829V5.13743H45.5044V7.35085H45.6514C45.9127 6.61577 46.3483 6.03587 46.9582 5.61115C47.568 5.18644 48.2977 4.97408 49.1471 4.97408C50.0074 4.97408 50.7398 5.18916 51.3442 5.61932C51.9486 6.04403 52.3515 6.62121 52.553 7.35085H52.6837C52.9396 6.6321 53.4024 6.05765 54.0722 5.62749C54.7474 5.19188 55.5451 4.97408 56.4653 4.97408C57.636 4.97408 58.5861 5.34707 59.3158 6.09304C60.0509 6.83357 60.4184 7.88447 60.4184 9.24574V17.6829H56.9472V9.93182C56.9472 9.23485 56.762 8.71212 56.3918 8.36364C56.0215 8.01515 55.5587 7.84091 55.0033 7.84091C54.3717 7.84091 53.8789 8.04238 53.5249 8.44531C53.171 8.8428 52.9941 9.36825 52.9941 10.0217V17.6829H49.6208V9.85831C49.6208 9.24302 49.4439 8.75296 49.0899 8.38814C48.7414 8.02332 48.2813 7.84091 47.7096 7.84091C47.323 7.84091 46.9745 7.93892 46.6642 8.13494C46.3592 8.32552 46.1169 8.59505 45.9372 8.94354C45.7575 9.28658 45.6677 9.68951 45.6677 10.1523V17.6829H42.1883Z'
								fill='white'
								variants={pathVariants}
							/>
							<motion.path
								d='M63.1668 17.6829V5.13743H66.6462V17.6829H63.1668ZM64.9147 3.52024C64.3974 3.52024 63.9536 3.34872 63.5834 3.00568C63.2185 2.6572 63.0361 2.24065 63.0361 1.75604C63.0361 1.27687 63.2185 0.865767 63.5834 0.522728C63.9536 0.174243 64.3974 0 64.9147 0C65.432 0 65.873 0.174243 66.2378 0.522728C66.6081 0.865767 66.7932 1.27687 66.7932 1.75604C66.7932 2.24065 66.6081 2.6572 66.2378 3.00568C65.873 3.34872 65.432 3.52024 64.9147 3.52024Z'
								fill='white'
								variants={pathVariants}
							/>
						</motion.svg>
					</Link>

					<div className='hidden items-center space-x-2 sm:flex'>
						<>
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									duration: 1,
									ease: 'easeInOut',
								}}
							>
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
							</motion.div>

							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									duration: 1,
									ease: 'easeInOut',
								}}
							>
								<LoginLink
									className={buttonVariants({
										size: 'nav',
										variant: 'hero',
										className: ' bg-transparent hover:bg-[#1e1922] text-white',
									})}
								>
									Sign in
								</LoginLink>
							</motion.div>

							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: [0, 1.2, 1] }}
								transition={{
									duration: 1,
									ease: 'easeInOut',
								}}
							>
								<RegisterLink
									className={buttonVariants({
										size: 'nav',
										variant: 'hero',
										className: ' bg-[#1e1922] hover:bg-[#312a37] text-white',
									})}
								>
									Sign up <ArrowRightIcon className='ml-2 h-4 w-4' />
								</RegisterLink>
							</motion.div>
						</>
					</div>

					<motion.div
						className='sm:hidden'
						variants={svgVariants}
						initial='hidden'
						animate='visible'
					>
						<Sheet>
							<SheetTrigger asChild>
								<Button
									size='icon'
									variant='hero'
									className='sm:hidden border-0'
								>
									<Menu className='h-6 w-6 text-[#FAFAFA]' />
									<span className='sr-only'>Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='top' className='border-0 bg-[#09090b] py-20'>
								<div className='flex flex-col items-center space-y-2 '>
									<>
										<motion.div
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												duration: 1,
												ease: 'easeInOut',
											}}
										>
											<Link
												href='/pricing'
												className={buttonVariants({
													size: 'hero',
													variant: 'hero',
													className:
														'bg-transparent text-white hover:text-[#9a7eb2]',
												})}
											>
												Pricing
											</Link>
										</motion.div>

										<motion.div
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												duration: 1,
												ease: 'easeInOut',
											}}
										>
											<LoginLink
												className={buttonVariants({
													size: 'nav',
													variant: 'hero',
													className:
														' bg-transparent hover:bg-[#1e1922] text-white mb-2',
												})}
											>
												Sign in
											</LoginLink>
										</motion.div>

										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: [0, 1.2, 1] }}
											transition={{
												duration: 1,
												ease: 'easeInOut',
											}}
										>
											<RegisterLink
												className={buttonVariants({
													size: 'nav',
													variant: 'hero',
													className:
														' bg-[#1e1922] hover:bg-[#312a37] text-white',
												})}
											>
												Sign up <ArrowRightIcon className='ml-2 h-4 w-4' />
											</RegisterLink>
										</motion.div>
									</>
								</div>
							</SheetContent>
						</Sheet>
					</motion.div>
				</div>
			</MaxWidthWrapper>
		</nav>
	)
}

export default Navbar

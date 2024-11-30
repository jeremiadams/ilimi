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
							width='105'
							height='27'
							viewBox='0 0 105 27'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							variants={svgVariants}
							initial='hidden'
							animate='visible'
						>
							<motion.path
								variants={pathVariants}
								d='M75.502 4.37769C75.502 1.95996 77.4619 0 79.8796 0H100.309C102.727 0 104.687 1.95996 104.687 4.37769V7.29615C104.687 9.71388 102.727 11.6738 100.309 11.6738H79.8796C77.4619 11.6738 75.502 9.71388 75.502 7.29615V4.37769Z'
								fill='#FF9100'
							/>
							<motion.path
								variants={pathVariants}
								d='M81.8623 8.75539V3.4491H83.8936C84.277 3.4491 84.5957 3.50956 84.8496 3.63047C85.1053 3.74966 85.2961 3.91289 85.4222 4.12016C85.55 4.32744 85.614 4.56235 85.614 4.8249C85.614 5.04082 85.5725 5.22564 85.4896 5.37937C85.4067 5.53137 85.2953 5.65488 85.1554 5.74988C85.0154 5.84488 84.8591 5.91311 84.6864 5.95456V6.00638C84.8747 6.01675 85.0552 6.07461 85.2279 6.17998C85.4024 6.28362 85.5449 6.43044 85.6554 6.62044C85.766 6.81044 85.8212 7.04018 85.8212 7.30964C85.8212 7.58428 85.7547 7.83128 85.6217 8.05065C85.4887 8.26829 85.2884 8.44016 85.0206 8.56625C84.7529 8.69235 84.4161 8.75539 84.0102 8.75539H81.8623ZM82.8235 7.95219H83.8573C84.2062 7.95219 84.4575 7.88569 84.6113 7.75269C84.7667 7.61796 84.8444 7.44523 84.8444 7.2345C84.8444 7.07731 84.8056 6.93567 84.7279 6.80958C84.6501 6.68176 84.5396 6.58158 84.3962 6.50903C84.2528 6.43475 84.0818 6.39762 83.8832 6.39762H82.8235V7.95219ZM82.8235 5.70583H83.7744C83.9402 5.70583 84.0896 5.6756 84.2226 5.61515C84.3556 5.55296 84.4601 5.46574 84.5361 5.35346C84.6138 5.23946 84.6527 5.10473 84.6527 4.94927C84.6527 4.74372 84.5802 4.57444 84.4351 4.44144C84.2917 4.30844 84.0784 4.24194 83.7951 4.24194H82.8235V5.70583Z'
								fill='black'
							/>
							<motion.path
								variants={pathVariants}
								d='M86.6575 8.75539V3.4491H90.1086V4.25489H87.6187V5.69547H89.9299V6.50126H87.6187V7.9496H90.1294V8.75539H86.6575Z'
								fill='black'
							/>
							<motion.path
								variants={pathVariants}
								d='M90.8561 4.25489V3.4491H95.0898V4.25489H93.4497V8.75539H92.4962V4.25489H90.8561Z'
								fill='black'
							/>
							<motion.path
								variants={pathVariants}
								d='M95.9461 8.75539H94.9201L96.7881 3.4491H97.9748L99.8455 8.75539H98.8195L97.4022 4.53731H97.3607L95.9461 8.75539ZM95.9798 6.67485H98.778V7.44696H95.9798V6.67485Z'
								fill='black'
							/>
							<motion.path
								variants={pathVariants}
								d='M3.93742 8.30452C3.15867 8.30452 2.39741 8.53544 1.74991 8.96809C1.1024 9.40074 0.597734 10.0157 0.29972 10.7351C0.001706 11.4546 -0.076268 12.2463 0.0756582 13.0101C0.227584 13.7739 0.602587 14.4755 1.15324 15.0261C1.7039 15.5768 2.40548 15.9518 3.16927 16.1037C3.93305 16.2556 4.72473 16.1776 5.4442 15.8796C6.16367 15.5816 6.77861 15.077 7.21126 14.4294C7.64391 13.7819 7.87484 13.0207 7.87484 12.2419C7.87484 11.1977 7.46 10.1962 6.72159 9.45776C5.98319 8.71935 4.98169 8.30452 3.93742 8.30452ZM3.93742 13.5544C3.67784 13.5544 3.42408 13.4774 3.20825 13.3332C2.99241 13.189 2.82419 12.984 2.72485 12.7442C2.62551 12.5044 2.59952 12.2405 2.65017 11.9859C2.70081 11.7313 2.82581 11.4974 3.00936 11.3139C3.19291 11.1303 3.42677 11.0053 3.68137 10.9547C3.93596 10.904 4.19986 10.93 4.43968 11.0294C4.6795 11.1287 4.88448 11.2969 5.0287 11.5128C5.17292 11.7286 5.24989 11.9824 5.24989 12.2419C5.24989 12.59 5.11161 12.9239 4.86548 13.17C4.61934 13.4161 4.28551 13.5544 3.93742 13.5544Z'
								fill='white'
							/>
							<motion.path
								variants={pathVariants}
								d='M18.0463 19.4605C18.3944 19.4605 18.7283 19.3223 18.9744 19.0761C19.2205 18.83 19.3588 18.4962 19.3588 18.1481V15.0309C19.359 14.0925 19.0374 13.1824 18.4476 12.4525C17.8579 11.7225 17.0356 11.2169 16.1181 11.02C15.2006 10.823 14.2432 10.9467 13.4059 11.3703C12.5685 11.7939 11.9017 12.4919 11.5168 13.3477L7.09047 23.1912C6.95233 23.5011 6.71167 23.754 6.40898 23.9073C6.10629 24.0606 5.76003 24.105 5.42847 24.033C5.0969 23.961 4.80025 23.777 4.58842 23.5119C4.37659 23.2469 4.26251 22.9169 4.26537 22.5777V19.4605C4.26537 19.1125 4.12709 18.7786 3.88095 18.5325C3.63482 18.2863 3.30098 18.1481 2.95289 18.1481C2.6048 18.1481 2.27097 18.2863 2.02483 18.5325C1.7787 18.7786 1.64042 19.1125 1.64042 19.4605V22.5777C1.64022 23.5161 1.96184 24.4262 2.5516 25.1561C3.14137 25.8861 3.96362 26.3917 4.88114 26.5887C5.79867 26.7856 6.75599 26.6619 7.59336 26.2383C8.43074 25.8147 9.09752 25.1167 9.48245 24.2609L13.9088 14.4174C14.0469 14.1075 14.2876 13.8546 14.5903 13.7013C14.8929 13.548 15.2392 13.5036 15.5708 13.5756C15.9023 13.6476 16.199 13.8316 16.4108 14.0967C16.6226 14.3617 16.7367 14.6917 16.7339 15.0309V18.1481C16.7339 18.4962 16.8721 18.83 17.1183 19.0761C17.3644 19.3223 17.6983 19.4605 18.0463 19.4605Z'
								fill='white'
							/>
							<motion.path
								variants={pathVariants}
								d='M25.2809 26.68V13.1195H29.0418V26.68H25.2809ZM27.1702 11.3715C26.611 11.3715 26.1314 11.1861 25.7311 10.8153C25.3368 10.4386 25.1396 9.98834 25.1396 9.46452C25.1396 8.94658 25.3368 8.50222 25.7311 8.13142C26.1314 7.75474 26.611 7.5664 27.1702 7.5664C27.7293 7.5664 28.206 7.75474 28.6004 8.13142C29.0006 8.50222 29.2007 8.94658 29.2007 9.46452C29.2007 9.98834 29.0006 10.4386 28.6004 10.8153C28.206 11.1861 27.7293 11.3715 27.1702 11.3715Z'
								fill='white'
							/>
							<motion.path
								variants={pathVariants}
								d='M35.8154 8.59933V26.68H32.0545V8.59933H35.8154Z'
								fill='white'
							/>
							<motion.path
								variants={pathVariants}
								d='M38.8282 26.68V13.1195H42.5891V26.68H38.8282ZM40.7174 11.3715C40.1583 11.3715 39.6786 11.1861 39.2784 10.8153C38.8841 10.4386 38.6869 9.98834 38.6869 9.46452C38.6869 8.94658 38.8841 8.50222 39.2784 8.13142C39.6786 7.75474 40.1583 7.5664 40.7174 7.5664C41.2766 7.5664 41.7533 7.75474 42.1477 8.13142C42.5479 8.50222 42.748 8.94658 42.748 9.46452C42.748 9.98834 42.5479 10.4386 42.1477 10.8153C41.7533 11.1861 41.2766 11.3715 40.7174 11.3715Z'
								fill='white'
							/>
							<motion.path
								variants={pathVariants}
								d='M45.6018 26.68V13.1195H49.1861V15.512H49.3451C49.6276 14.7175 50.0984 14.0906 50.7576 13.6316C51.4168 13.1725 52.2055 12.9429 53.1236 12.9429C54.0536 12.9429 54.8452 13.1754 55.4985 13.6404C56.1518 14.0995 56.5873 14.7233 56.8051 15.512H56.9464C57.223 14.7351 57.7233 14.1142 58.4472 13.6492C59.177 13.1784 60.0393 12.9429 61.034 12.9429C62.2994 12.9429 63.3264 13.3461 64.1151 14.1524C64.9096 14.9529 65.3069 16.0888 65.3069 17.5602V26.68H61.5548V18.3018C61.5548 17.5485 61.3547 16.9834 60.9545 16.6067C60.5543 16.2301 60.054 16.0417 59.4537 16.0417C58.7709 16.0417 58.2383 16.2595 57.8557 16.695C57.4731 17.1247 57.2819 17.6926 57.2819 18.3989V26.68H53.6357V18.2224C53.6357 17.5573 53.4444 17.0276 53.0618 16.6332C52.6852 16.2389 52.1878 16.0417 51.5698 16.0417C51.152 16.0417 50.7753 16.1477 50.4398 16.3596C50.1102 16.5655 49.8483 16.8569 49.6541 17.2336C49.4598 17.6044 49.3627 18.0399 49.3627 18.5402V26.68H45.6018Z'
								fill='white'
							/>
							<motion.path
								variants={pathVariants}
								d='M68.2777 26.68V13.1195H72.0386V26.68H68.2777ZM70.167 11.3715C69.6079 11.3715 69.1282 11.1861 68.728 10.8153C68.3336 10.4386 68.1364 9.98834 68.1364 9.46452C68.1364 8.94658 68.3336 8.50222 68.728 8.13142C69.1282 7.75474 69.6079 7.5664 70.167 7.5664C70.7261 7.5664 71.2029 7.75474 71.5972 8.13142C71.9974 8.50222 72.1975 8.94658 72.1975 9.46452C72.1975 9.98834 71.9974 10.4386 71.5972 10.8153C71.2029 11.1861 70.7261 11.3715 70.167 11.3715Z'
								fill='white'
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

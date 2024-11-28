'use client'
import { FC } from 'react'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import SplitText from '@/components/SplitText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { animate, motion, Variants } from 'framer-motion'

interface HeroProps {}

const DURATION = 0.25
const STAGGER = 0.025

const Hero: FC<HeroProps> = ({}) => {
	return (
		<MaxWidthWrapper className='pb-12 pt-12 sm:pt-40 flex flex-col items-center justify-center text-center relative z-10'>
			<motion.h1 className='max-w-5xl text-6xl sm:text-5xl font-bold md:text-6xl lg:text-7xl text-white tracking-tighter leading-[1]'>
				<SplitText
					initial={{ y: '100%' }}
					animate='visible'
					variants={{
						visible: (i: any) => ({
							y: 0,
							transition: {
								delay: i * 0.1,
							},
						}),
					}}
					className=''
				>
					Generate tailored
				</SplitText>{' '}
				<SplitText
					initial={{ y: '100%' }}
					animate='visible'
					variants={{
						visible: (i: any) => ({
							y: 0,
							transition: {
								delay: 2 * 0.1,
							},
						}),
					}}
					className='text-[#f5cbb6]'
				>
					learning pathways
				</SplitText>{' '}
				<SplitText
					initial={{ y: '100%' }}
					animate='visible'
					variants={{
						visible: (i: any) => ({
							y: 0,
							transition: {
								delay: 4 * 0.1,
							},
						}),
					}}
					className=''
				>
					in minutes
				</SplitText>
			</motion.h1>
			<motion.p
				className=' mt-5 max-w-xl text-lg sm:text-2xl text-gray-300'
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 2,
					ease: 'easeInOut',
				}}
			>
				Ilimi lets you generate learning pathways, course content and quizzes
				for any concept you want to learn. Personalize your learning now!
			</motion.p>
			<motion.div
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 2,
					ease: 'easeInOut',
				}}
			>
				{/* <Link
                    href='/dashboard'
                    target='_blank'
                    className={buttonVariants({
                        size: 'hero',
                        variant: 'hero',
                        className: 'mt-5 bg-white text-black text-base hover:bg-gray-200',
                    })}
                >
                    Sign up for free <ArrowRightIcon className='ml-2 h-4 w-4' />
                </Link> */}
				<RegisterLink
					className={buttonVariants({
						size: 'hero',
						variant: 'hero',
						className: 'mt-5 bg-white text-black text-base hover:bg-gray-200',
					})}
				>
					Sign up for free <ArrowRightIcon className='ml-2 h-4 w-4' />
				</RegisterLink>
			</motion.div>
		</MaxWidthWrapper>
	)
}

export default Hero

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { FC } from 'react'
import { PLANS } from '@/config/paystack'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Check, HelpCircle, Minus } from 'lucide-react'
import {
	getKindeServerSession,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { buttonVariants } from '@/components/ui/button'
import UpgradeButton from '@/components/UpgradeButton'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Footer from '@/components/Footer'

interface PageProps {}

const pricingOptions = [
	{
		plan: 'Free',
		tagline: '',
		quota: 5,
		features: [
			{
				text: 'Generate up to 5 learning pathways',
				footnote: 'The maximum amount learning pathways you can generate',
			},
			{
				text: 'Utilizes the best A.I models',
				footnote: 'Utitlizes the best A.I models for enhanced content quality',
			},
			{
				text: 'Priority support',
				negative: true,
			},
		],
	},
	{
		plan: 'Pro',
		tagline: 'Upgrade',
		quota: PLANS.find((p) => p.slug === 'pro')!.quota,
		features: [
			{
				text: 'Generate up to 50 learning pathways',
				footnote: 'The maximum amount learning pathways you can generate',
			},
			{
				text: 'Utilizes the best A.I models',
				footnote: 'Utitlizes the best A.I models for enhanced content quality',
			},
			{
				text: 'Priority support',
				negative: false,
			},
		],
	},
]

const Page: FC<PageProps> = async ({}) => {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	return (
		<>
			<Navbar />
			<MaxWidthWrapper className='mb-12 mt-12 sm:mt-40 max-w-5xl'>
				<div className=' mx-auto mb-10 sm:max-w-xl'>
					<h1 className=' text-6xl sm:text-7xl font-bold text-white'>
						Upgrade to Pro!
					</h1>
					<p className=' mt-5 sm:text-lg text-gray-300'>
						Try our free plan or better still, upgrade to pro for more access.
					</p>
				</div>
				<div className=' pt-12 grid grid-cols-1 gap-5 lg:grid-cols-2'>
					{pricingOptions.map(({ plan, quota, tagline, features }) => {
						const price =
							PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount ||
							0
						return (
							<TooltipProvider key={plan}>
								<div
									key={plan}
									className={cn('relative rounded-3xl text-white px-7 py-12', {
										' bg-gradient-to-tr from-[#f5cbb68c] to-[#ca99e98e]':
											plan === 'Pro',
										'border border-[#1c1c1c]': plan !== 'Pro',
									})}
								>
									{tagline !== '' && (
										<div className=' absolute uppercase font-semibold text-xs right-5 top-5 px-3 py-1 bg-[#240046] text-[] rounded-md'>
											<span>{tagline}</span>
										</div>
									)}
									<h3 className=' font-semibold text-lg'>{plan}</h3>
									<p className=' font-bold text-4xl'>
										NGN {price}
										<span className=' font-semibold text-base'>/month</span>
									</p>
									<p className=' py-2 font-semibold'>
										Up to {quota.toLocaleString()} pathways
									</p>

									<ul className=' my-10 space-y-5'>
										{features.map(({ text, footnote, negative }) => {
											return (
												<li key={text} className='flex items-center space-x-3'>
													<div className=' flex-shrink-0'>
														{negative ? (
															<Minus className='h-5 w-5 ' />
														) : (
															<Check className='h-5 w-5 ' />
														)}
													</div>
													{footnote ? (
														<div className=' flex items-center space-x-1'>
															<p
																className={cn('', {
																	'text-gray-400': negative,
																})}
															>
																{text}
															</p>
															<Tooltip delayDuration={300}>
																<TooltipTrigger className=' cursor-default ml-1'>
																	<HelpCircle className='w-4 h-4' />
																</TooltipTrigger>
																<TooltipContent>{footnote}</TooltipContent>
															</Tooltip>
														</div>
													) : (
														<p
															className={cn('', { 'text-gray-600': negative })}
														>
															{text}
														</p>
													)}
												</li>
											)
										})}
									</ul>
									<div className=''>
										{plan === 'Free' ? (
											user ? (
												<UpgradeButton />
											) : (
												<RegisterLink
													className={buttonVariants({
														className:
															'w-full bg-[#1e1922] hover:bg-[#312a37] text-white rounded-md py-3',
														variant: 'hero',
														size: 'icon',
													})}
												>
													Sign up <ArrowRightIcon className='ml-2 h-4 w-4' />
												</RegisterLink>
											)
										) : user ? (
											<UpgradeButton />
										) : (
											<RegisterLink
												className={buttonVariants({
													className:
														'w-full bg-[#1e1922] hover:bg-[#312a37] text-white rounded-md py-3',
													variant: 'hero',
													size: 'icon',
												})}
											>
												Sign up <ArrowRightIcon className='ml-2 h-4 w-4' />
											</RegisterLink>
										)}
									</div>
								</div>
							</TooltipProvider>
						)
					})}
				</div>
			</MaxWidthWrapper>
			<Footer />
		</>
	)
}

export default Page

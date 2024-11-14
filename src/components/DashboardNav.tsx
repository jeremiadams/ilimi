'use client'

import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from './ui/tooltip'
import Link from 'next/link'
import { HomeIcon } from '@radix-ui/react-icons'
import {
	Home,
	LogOut,
	PanelLeft,
	Route,
	Settings,
	Shapes,
	UserRound,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import Image from 'next/image'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

const DashboardNav = ({ user }: { user: KindeUser | null }) => {
	const pathname = usePathname()
	return (
		<TooltipProvider>
			<aside className='fixed inset-y-0 left-0 z-10 w-20 md:w-60 hidden flex-col border-r border-[#27272A] sm:flex'>
				<nav className='flex flex-col justify-between h-full w-full px-3 sm:py-10'>
					<div className='flex flex-col gap-1'>
						<div className='flex items-center gap-2 z-40 justify-center md:justify-normal md:ml-2 text-[#FAFAFA] mb-5'>
							<div className='bg-[#7058d0] flex justify-center uppercase items-center font-semibold text-sm text-black h-10 w-10 rounded-md'>
								{user?.given_name
									? user?.given_name.charAt(0).toUpperCase()
									: user?.family_name
									? user?.family_name.charAt(0).toUpperCase()
									: 'YA'}
							</div>
							<span className='hidden md:block font-medium capitalize text-[#FAFAFA]'>
								{user?.given_name
									? user?.given_name
									: user?.family_name
									? user?.family_name
									: 'Your Account'}
							</span>
						</div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/dashboard'
									className={`flex justify-center md:justify-normal ${
										pathname === '/dashboard'
											? 'bg-[#262628]'
											: 'text-[#A1A1AA]'
									} shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 md:text-base`}
								>
									<HomeIcon className='h-[18px] w-[18px]' />
									<span className='hidden md:block'>Overview</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent
								// className='bg-black text-[#FAFAFA] border-[#27272A]'
								side='right'
							>
								Overview
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/dashboard/pathways'
									className={`flex justify-center md:justify-normal ${
										pathname.includes('pathways')
											? 'bg-[#262628]'
											: 'text-[#A1A1AA]'
									} shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 md:text-base`}
								>
									<Route className='h-[18px] w-[18px]' />
									<span className='hidden md:block'>Pathways</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Pathways</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/dashboard/settings'
									className={`flex justify-center md:justify-normal ${
										pathname.includes('settings')
											? 'bg-[#262628]'
											: 'text-[#A1A1AA]'
									} shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 md:text-base`}
								>
									<Settings className='h-[18px] w-[18px]' />
									<span className='hidden md:block'>Settings</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Settings</TooltipContent>
						</Tooltip>
					</div>
					<div>
						<Tooltip>
							<TooltipTrigger asChild>
								<LogoutLink
									className={buttonVariants({
										size: 'nav',
										variant: 'hero',
										className:
											'flex justify-center md:justify-normal text-[#A1A1AA] hover:text-[#FAFAFA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 md:text-base',
									})}
								>
									<LogOut className='h-[18px] w-[18px]' />
									<span className='hidden md:block'>Log out</span>
								</LogoutLink>
							</TooltipTrigger>
							<TooltipContent side='right'>Log out</TooltipContent>
						</Tooltip>
					</div>
				</nav>
			</aside>
			<div className='sm:hidden '>
				<header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#27272A] bg-[#09090b] px-5 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-5'>
					<Sheet>
						<SheetTrigger asChild>
							<Button size='icon' variant='hero' className='sm:hidden border-0'>
								<PanelLeft className='h-7 w-7 text-[#FAFAFA]' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side='left'
							className='sm:max-w-xs border-0 bg-[#09090b] w-2/3'
						>
							<nav className='flex flex-col h-full justify-between text-lg font-medium pt-10'>
								<div className='flex flex-col'>
									<div className='flex items-center gap-2 z-40 ml-2 text-[#FAFAFA] mb-5'>
										<div className='bg-[#7058d0] flex justify-center uppercase items-center font-semibold text-sm text-black h-10 w-10 rounded-md'>
											{user?.given_name
												? user?.given_name.charAt(0).toUpperCase()
												: user?.family_name
												? user?.family_name.charAt(0).toUpperCase()
												: 'YA'}
										</div>
										<span className='hidden md:block font-medium capitalize text-[#FAFAFA]'>
											{user?.given_name
												? user?.given_name
												: user?.family_name
												? user?.family_name
												: 'Your Account'}
										</span>
									</div>
									<Link
										href='/dashboard'
										className={`flex ${
											pathname === '/dashboard'
												? 'text-[#FAFAFA]'
												: 'text-[#A1A1AA] '
										} shrink-0 w-full py-2 px-3 rounded-sm items-center gap-4 text-xl`}
									>
										<HomeIcon className='h-5 w-5' />
										<span className=''>Overview</span>
									</Link>
									<Link
										href='/dashboard/pathways'
										className={`flex ${
											pathname.includes('pathways')
												? 'text-[#FAFAFA]'
												: 'text-[#A1A1AA] '
										} shrink-0 w-full py-2 px-3 rounded-sm items-center gap-4 text-xl`}
									>
										<Route className='h-5 w-5' />
										<span className=''>Pathways</span>
									</Link>
									<Link
										href='/dashboard/settings'
										className={`flex ${
											pathname.includes('settings')
												? 'text-[#FAFAFA]'
												: 'text-[#A1A1AA] '
										} shrink-0 w-full py-2 px-3 rounded-sm items-center gap-4 text-xl`}
									>
										<Settings className='h-5 w-5' />
										<span className=''>Settings</span>
									</Link>
								</div>
								<div className=''>
									<LogoutLink
										className={buttonVariants({
											size: 'nav',
											variant: 'hero',
											className:
												'flex text-[#A1A1AA] hover:text-[#FAFAFA] shrink-0 py-2 px-3 items-center gap-2 md:text-base',
										})}
									>
										<LogOut className='h-[20px] w-[20px]' />
										<span className='text-xl'>Log out</span>
									</LogoutLink>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</header>
			</div>
		</TooltipProvider>
	)
}

export default DashboardNav

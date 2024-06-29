'use client'

import { Children, FC, PropsWithChildren } from 'react'
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
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

const DashboardLayout = ({ children }: PropsWithChildren) => {
	const pathname = usePathname()
	return (
		<TooltipProvider>
			<div className='flex flex-col sm:flex-row min-h-screen w-full text-[#FAFAFA] bg-[#09090b]'>
				<aside className='fixed inset-y-0 left-0 z-10 w-20 md:w-60 hidden flex-col border-r border-[#27272A] sm:flex'>
					<nav className='flex flex-col justify-between h-full w-full px-3 sm:py-10'>
						<div className='flex flex-col gap-1'>
							<div className='flex items-center gap-2 z-40 justify-center md:justify-normal md:ml-2 text-[#FAFAFA] mb-5'>
								<div className='bg-[#7058d0] flex justify-center items-center font-semibold text-sm text-black h-10 w-10 rounded-md'>
									<span>J</span>
								</div>
								<span className='hidden md:block font-medium text-[#FAFAFA]'>
									Jeremiah
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
							{/* <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href='#'
                                        className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg'
                                    >
                                        <Shapes className='h-[18px] w-[18px]' />
                                        <span className=''>Courses</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side='right'>Courses</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href='#'
                                        className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg'
                                    >
                                        <UserRound className='h-[18px] w-[18px]' />
                                        <span className=''>Profile</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side='right'>Profile</TooltipContent>
                            </Tooltip> */}
						</div>
						<div>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href='#'
										className='flex justify-center md:justify-normal text-[#A1A1AA] hover:text-[#FAFAFA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2
										md:text-base'
									>
										<LogOut className='h-[18px] w-[18px]' />
										<span className='hidden md:block'>Log out</span>
									</Link>
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
								<Button
									size='icon'
									variant='hero'
									className='sm:hidden border-0'
								>
									<PanelLeft className='h-7 w-7 text-[#FAFAFA]' />
									<span className='sr-only'>Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side='left'
								className='sm:max-w-xs border-0 bg-[#09090b]'
							>
								<nav className='flex flex-col h-full justify-between text-lg font-medium pt-20'>
									<div className='flex flex-col'>
										<div className='flex items-center gap-2 z-40 ml-2 text-[#FAFAFA] mb-5'>
											<div className='bg-[#7058d0] flex justify-center items-center font-semibold text-sm text-black h-10 w-10 rounded-md'>
												<span>J</span>
											</div>
											<span className='font-medium text-[#FAFAFA]'>
												Jeremiah
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
									<div>
										<Link
											href='#'
											className='flex text-[#A1A1AA] hover:text-[#FAFAFA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-4 text-xl'
										>
											<LogOut className='h-5 w-5' />
											<span className=''>Log out</span>
										</Link>
									</div>
								</nav>
							</SheetContent>
						</Sheet>
					</header>
				</div>
				<main className='max-[639px]:ml-0 min-[640px]:ml-20 md:ml-60 w-full p-5 sm:p-10 bg-[#151518]'>
					{children}
				</main>
			</div>
		</TooltipProvider>
	)
}

export default DashboardLayout

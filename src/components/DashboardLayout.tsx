import { Children, FC, PropsWithChildren } from 'react'
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from './ui/tooltip'
import Link from 'next/link'
import { HomeIcon } from '@radix-ui/react-icons'
import { Home, LogOut, Route, Settings, Shapes, UserRound } from 'lucide-react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<TooltipProvider>
			<div className='flex min-h-screen w-full text-[#FAFAFA] bg-[#09090b]'>
				<aside className='fixed inset-y-0 left-0 z-10 w-60 hidden flex-col border-r border-[#27272A] sm:flex'>
					<nav className='flex flex-col justify-between h-full w-full px-3 sm:py-10'>
						<div className='flex flex-col gap-1'>
							<Link
								href='/'
								className='flex items-center gap-2 z-40 ml-2 text-[#FAFAFA] mb-5'
							>
								<div className='bg-[#7058d0] flex justify-center items-center font-semibold text-sm text-black h-10 w-10 rounded-md'>
									<span>J</span>
								</div>
								<span className='font-medium text-[#FAFAFA]'>Jeremiah</span>
							</Link>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href='#'
										className='flex bg-[#262628] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg md:text-base'
									>
										<HomeIcon className='h-[18px] w-[18px]' />
										<span className=''>Overview</span>
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
										href='#'
										className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg md:text-base'
									>
										<Route className='h-[18px] w-[18px]' />
										<span className=''>Pathways</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>Pathways</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href='#'
										className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg md:text-base'
									>
										<Settings className='h-[18px] w-[18px]' />
										<span className=''>Settings</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>Settings</TooltipContent>
							</Tooltip>
							{/* <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href='#'
                                        className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg md:text-base'
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
                                        className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg md:text-base'
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
										className='flex text-[#A1A1AA] shrink-0 w-full py-2 px-3 rounded-sm items-center gap-2 text-lg md:text-base'
									>
										<LogOut className='h-[18px] w-[18px]' />
										<span className=''>Log out</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>Log out</TooltipContent>
							</Tooltip>
						</div>
					</nav>
				</aside>
				<main className='ml-60 w-full p-10 bg-[#151518]'>{children}</main>
			</div>
		</TooltipProvider>
	)
}

export default DashboardLayout

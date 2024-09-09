'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import { openai } from '@/lib/openai'

export default function Home() {
	const icon = {
		hidden: {
			pathLength: 0,
			// fill: "rgba(255, 255, 255, 1)"
		},
		visible: {
			pathLength: 1,
			// fill: "rgba(255, 255, 255, 0) "
		},
	}
	//mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center

	return (
		<>
			<Navbar />
			<MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center relative z-10'>
				{/* <div className="[perspective:700px]">
              <div className="relative [transform:rotateX(45deg)] ">
                <div className="flex justify-between absolute w-full">
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                  <svg className="relative" width="2" height="624" viewBox="0 0 2 624" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M1 0V623.5" 
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M1 0V623.5" 
                      // stroke="red"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                      style={{
                        strokeDasharray: '10 1000',
                        strokeDashoffset: '3',
                        // strokeLinecap: 'round',
                      }}
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between absolute w-full h-[623px]">
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                  <svg className="relative" width="auto" height="2" viewBox="0 0 1234 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M0.5 1H1234"
                      stroke="black"
                      className='absolute stroke-blue-100'
                    />
                    <motion.path 
                      d="M0.5 1H1234"
                      className='absolute stroke-blue-900 blur-[0.5px]'
                        style={{
                          strokeDasharray: '10 1500',
                          strokeDashoffset: '3',
                          // strokeLinecap: 'round',
                        }}
                    />
                  </svg>
                </div>
              </div>
            </div> */}
				{/* <div className=" mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 px-7 py-2 shadow-md backdrop-blur transition-all">
  //bg-gradient-to-r from-[#3a015c] to-[#22007c] bg-clip-text text-transparent
            </div> */}
				<h1 className='max-w-5xl text-5xl font-bold md:text-6xl lg:text-7xl text-white tracking-tighter leading-[1]'>
					Generate tailored{' '}
					<span className=' text-[#f5cbb6]'>learning pathways </span> in
					minutes.
				</h1>
				<p className=' mt-5 max-w-xl sm:text-2xl text-gray-300'>
					Ilimi lets you generate learning pathways, course content and quizzes
					for any concept you want to learn. Personalize your learning now!
				</p>
				<Link
					href='/dashboard'
					target='_blank'
					className={buttonVariants({
						size: 'hero',
						variant: 'hero',
						className: 'mt-5 bg-white text-black text-base hover:bg-gray-200',
					})}
				>
					Sign up for free <ArrowRightIcon className='ml-2 h-4 w-4' />
				</Link>
			</MaxWidthWrapper>

			<div>
				<div className=' relative isolate'>
					<div
						aria-hidden='true'
						className=' pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
					>
						<div
							style={{
								clipPath:
									'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
							}}
							className=' relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3a015c] via-[#6a040f] to-[#0d00a4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
						/>
					</div>

					{/* <div aria-hidden='true' className=" pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }} className=" relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3a015c] via-[#6a040f] to-[#0d00a4] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]" />
            </div> */}
				</div>
			</div>

			{/* INFINITE GRID ANIMATION */}
			{/* <div className="absolute top-0 w-screen h-screen [perspective:1000px] overflow-hidden [transform-style:preserve-3d] mb-[-100vh] [transform:rotateX(180deg)_rotateY(0)_rotate(0)_rotate(180deg)]">
          <div className=" relative overflow-hidden w-screen h-[200vh] [transform-style:preserve-3d] [transform:translateY(-50vh)_rotateX(69deg)_rotateY(0)_rotate(0)]">
            <div style={{
              backgroundImage: 'radial-gradient(circle farthest-corner at 50% 50%, rgba(0, 0, 0, 0), #000 50%, #000)'
            }} 
            className=" absolute z-10 w-full h-[200vh] [transform-style:preserve-3d] [transform:translateZ(2000px)]"/>
            <div className="flex absolute top-0 z-0 w-full h-[200vh] justify-around">
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              <div className="w-[1px] h-full bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
            </div>
            <div className="z-0 w-full h-[400vh] absolute top-0 animate-grid-move">
              <div className=" h-screen flex flex-col justify-between">
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              </div>
              <div className=" h-screen flex flex-col justify-between">
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              </div>
              <div className=" h-screen flex flex-col justify-between">
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              </div>
              <div className=" h-screen flex flex-col justify-between">
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
                <div className=" w-full h-[1px] bg-[#370617] shadow-[0px_0px_10px_#dfe3e8]" />
              </div>
            </div>
          </div>
        </div> */}
		</>
	)
}

// messages: [
//   {
//       role: "user",
//       content: "Create a new Cat object."
//   }
// ],
// functions: [
//   {
//       name: "createCatObject",
//       parameters: {
//         type: 'object',
//           properties: {
//               name: {
//                   type: "string"
//               },
//               colours: {
//                   type: 'array',
//                   description: "An array of 3 possible colours for a cat, e.g. ['Black', 'Brown', 'Grey'].",
//                   items: {
//                     type: 'string'
//                   }
//                   // enum: ["brown", "grey", "black"]
//               },
//               age: {
//                   type: "integer"
//               }
//           },
//           required: ["name", "colours", "age"]
//       }
//   }
// ],
// function_call: { name: "createCatObject" }

// {
//   "modules": [
//     {
//       "title": "Module 1: Introduction to Algebra",
//       "description": "This module will cover the basic definitions and concepts needed to understand algebra. Topics covered include variables, constants, coefficients, expressions, and equations."
//     },
//     {
//       "title": "Module 2: Operations on Algebraic Expressions",
//       "description": "We will delve into the techniques of addition, subtraction, multiplication, and division on algebraic expressions. We will also learn about powers and roots."
//     },
//     {
//       "title": "Module 3: Solving Simple Equations",
//       "description": "This module will focus on teaching students how to solve simple algebraic equations using the concepts learned from the previous modules."
//     },
//     {
//       "title": "Module 4: Solving Complex Equations",
//       "description": "Building on the previous module, this section will teach strategies for solving more complex equations, including those with multiple variables."
//     },
//     {
//       "title": "Module 5: Algebra in Geometry",
//       "description": "In this module, students will learn how algebra is used in geometry, including finding angles, areas, and volumes."
//     },
//     {
//       "title": "Module 6: Review and Final Exam",
//       "description": "This last module will provide a comprehensive review of the course materials, and includes the final exam."
//     }
//   ]
// }

//{"modules": [{"title":"Introduction to Algebra","description":"This module introduces the basic concepts of algebra, including variables, constants, and algebraic expressions. Students will learn how to identify and categorize different types of algebraic expressions."},{"title":"Operations with Algebraic Expressions","description":"In this module, students will explore the four basic operations (addition, subtraction, multiplication, and division) as they relate to algebraic expressions. Simplifying expressions and combining like terms will be emphasized."},{"title":"Solving Linear Equations","description":"Students will learn how to solve linear equations in one variable. The module covers the methods for isolating variables and techniques for solving equations with one or two steps."},{"title":"Graphing Linear Equations","description":"This module covers the basics of graphing linear equations on a coordinate plane. Students will learn about slope, intercepts, and how to plot points."},{"title":"Systems of Linear Equations","description":"Students will be introduced to systems of linear equations. The module will cover methods for solving systems, including substitution and elimination."},{"title":"Inequalities and Absolute Value","description":"In this module, students will explore linear inequalities and absolute value equations. They will learn to solve and graph inequalities on a number line."},{"title":"Polynomials","description":"This module focuses on polynomials, including the classification, addition, subtraction, and multiplication of polynomials. Students will also learn how to factor simple polynomials."},{"title":"Introduction to Quadratic Equations","description":"Students will be introduced to quadratic equations, exploring their general form and methods for solving them, including factoring, completing the square, and the quadratic formula."},{"title":"Conclusion and Review","description":"This final module will review all concepts covered throughout the course, and provide students with strategies for continued practice and application of algebra in real-world scenarios."}]}

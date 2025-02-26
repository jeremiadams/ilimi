import Footer from '@/components/Footer'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import { FC } from 'react'

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	return (
		<>
			<Navbar />
			<MaxWidthWrapper className='mb-12 mt-12 sm:mt-20 max-w-5xl'>
				<div className=' mb-10'>
					<h1 className=' text-6xl sm:text-7xl font-bold text-white'>
						Privacy Policy
					</h1>
					<p className=' mt-5 sm:text-lg text-gray-300'>
						Effective Date:{' '}
						<span className='font-medium'>
							Februry, 2025, Ilimi (\"we,\" \"our,\" or \"us\") is committed to
							protecting your privacy. This Privacy Policy explains how we
							collect, use, disclose, and safeguard your information when you
							use our AI-powered pathway and course generation platform (the
							\"Service\").
						</span>
					</p>
				</div>

				<div className='text-[#f1fafa]'>
					<h2 className='text-2xl font-semibold mt-6 mb-4'>
						1. Information We Collect
					</h2>
					<ul className='list-disc pl-6 mb-4'>
						<li>
							<strong>Personal Information:</strong> When you sign up, we may
							collect your name, email address, and other relevant contact
							details.
						</li>
						<li>
							<strong>Usage Data:</strong> We collect data about your
							interactions with the Service, such as the topics you input,
							courses generated, and feedback provided.
						</li>
						<li>
							<strong>Automatically Collected Data:</strong> Our platform may
							automatically collect information about your device, browser, and
							IP address.
						</li>
					</ul>

					<h2 className='text-2xl font-semibold mt-6 mb-4'>
						2. How We Use Your Information
					</h2>
					<ul className='list-disc pl-6 mb-4'>
						<li>Provide and maintain the Service</li>
						<li>Improve AI-generated content through user feedback</li>
						<li>Communicate updates, offers, or support messages</li>
						<li>Ensure compliance with our terms and policies</li>
					</ul>

					<h2 className='text-2xl font-semibold mt-6 mb-4'>
						3. Sharing Your Information
					</h2>
					<p className='mb-4'>
						We do not sell or rent your personal data. We may share your
						information with:
					</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>
							<strong>Service providers</strong> who assist in operating our
							platform (e.g., cloud storage, AI model providers)
						</li>
						<li>
							<strong>Legal authorities</strong> if required by law or to
							protect our rights and users\' safety
						</li>
					</ul>

					<h2 className='text-2xl font-semibold mt-6 mb-4'>4. Data Security</h2>
					<p className='mb-4'>
						We implement appropriate technical and organizational measures to
						protect your data from unauthorized access, alteration, or loss.
					</p>

					<h2 className='text-2xl font-semibold mt-6 mb-4'>5. Your Rights</h2>
					<p className='mb-4'>
						You may have the right to access, correct, or delete your personal
						information. To make a request, please contact us at{' '}
						<span className='font-medium'>hello@ilimi.ai</span>.
					</p>

					<h2 className='text-2xl font-semibold mt-6 mb-4'>
						6. Changes to This Policy
					</h2>
					<p className='mb-8'>
						We may update this Privacy Policy from time to time. Any changes
						will be posted with the updated \"Effective Date.\"
					</p>
				</div>
			</MaxWidthWrapper>
			<Footer />
		</>
	)
}

export default Page

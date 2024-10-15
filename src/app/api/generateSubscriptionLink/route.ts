import axios from 'axios'
import { db } from '@/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300

export const POST = async (req: NextRequest, res: NextResponse) => {
	if (req.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 })
	}

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	const userDetails = await db.user.findFirst({
		where: {
			id: user.id,
		},
	})

	try {
		const paystackResponse = await axios.get(
			`https://api.paystack.co/subscription/${userDetails?.paystackSubscriptionId}/manage/link`,

			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		)

		const data = paystackResponse.data

		return NextResponse.json(data, { status: 200 })
	} catch (error: any) {
		console.error(
			'Error initializing payment:',
			error.response?.data || error.message
		)
		return new Response('Failed to initialize payment', { status: 500 })
	}
}

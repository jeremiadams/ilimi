import axios from 'axios'
import { db } from '@/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' })
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
		res.status(500).json({
			status: 'error',
			message: 'Failed to initialize payment',
			error: error.response?.data.message || error.message,
		})
	}
}

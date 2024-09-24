import { db } from '@/db'
import { paystack } from '@/lib/paystack'
import { NextApiRequest } from 'next'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

const crypto = require('crypto')
const secret = process.env.PAYSTACK_KEY

export const config = {
	api: {
		bodyParser: false,
	},
}

export async function POST(request: Request) {
	const hash = crypto
		.createHmac('sha512', secret)
		.update(JSON.stringify(request.body))
		.digest('hex')
	const signature = headers().get('x-paystack-signature') ?? ''

	if (hash == signature) {
		// Retrieve the request's body
		const rawBody = await getRawBody(request)
		const event = JSON.parse(rawBody)
		// const event = request.body
		console.log('Weebhook event', event)
		// Do something with event

		if (!event?.data?.customer.metadata.userId) {
			return new Response(null, {
				status: 400,
			})
		}

		if (event && event.event === 'subscription.create') {
			await db.user.update({
				where: {
					id: event?.data?.customer.metadata.userId,
				},
				data: {
					paystackSubscriptionId: event?.data?.subscription_code,
					paystackCustomerId: event?.data?.customer.customer_code,
					paystackPriceId: event?.data?.plan.plan_code,
					paystackCurrentPeriodEnd: event?.data?.next_payment_date,
				},
			})
		}

		if (event && event.event === 'invoice.update') {
			await db.user.update({
				where: {
					paystackSubscriptionId: event?.data?.subscription?.subscription_code,
				},
				data: {
					paystackCurrentPeriodEnd:
						event?.data?.subscription?.next_payment_date,
				},
			})
		}
	} else {
		return new Response(
			`Webhook Error: ${'There was an error from the webhook'}`,
			{ status: 400 }
		)
	}

	return new Response(null, { status: 200 })
}

async function getRawBody(req: Request): Promise<string> {
	const chunks: Uint8Array[] = []
	const reader = req.body!.getReader()

	let done: boolean | undefined
	let value: Uint8Array | undefined

	// Read the stream chunk by chunk
	while (!done) {
		;({ done, value } = await reader.read())
		if (value) {
			chunks.push(value)
		}
	}

	// Concatenate all chunks into a single buffer and convert to string
	const rawBody = Buffer.concat(chunks).toString('utf-8')
	return rawBody
}

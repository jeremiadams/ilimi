import { db } from '@/db'
import { paystack } from '@/lib/paystack'
import { NextApiRequest } from 'next'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const crypto = require('crypto')
const secret = process.env.PAYSTACK_KEY

const WHITELISTED_IPS = ['52.31.139.75', '52.49.173.169', '52.214.14.220']

export async function POST(request: NextRequest) {
	// const hash = crypto
	// 	.createHmac('sha512', secret)
	// 	.update(JSON.stringify(request.body))
	// 	.digest('hex')
	// const signature = headers().get('x-paystack-signature') ?? ''
	// console.log(hash)
	// console.log(signature)

	const clientIp = getClientIp(request)

	if (!WHITELISTED_IPS.includes(clientIp)) {
		return new NextResponse(`Access Denied: IP not whitelisted - ${clientIp}`, {
			status: 403,
		})
	}

	const event = await request.json()
	try {
		// Retrieve the request's body
		// const event = JSON.parse(rawBody)
		// const event = request.body
		// const res = await request.json()
		// const body = res.body
		console.log('Weebhook event', event)
		// Do something with event

		// if (!event?.data?.customer.metadata.userId) {
		// 	return new Response('Not a valid user', {
		// 		status: 400,
		// 	})
		// }

		if (event && event.event === 'subscription.create') {
			await db.user.update({
				where: {
					email: event?.data?.customer?.email,
				},
				data: {
					paystackSubscriptionId: event?.data?.subscription_code,
					paystackCustomerId: event?.data?.customer.customer_code,
					paystackPriceId: event?.data?.plan.plan_code,
					paystackEmailToken: event?.data?.email_token,
					paystackCurrentPeriodEnd: event?.data?.next_payment_date,
				},
			})

			return new Response(null, { status: 200 })
		}

		if (event && event.event === 'charge.success') {
			if (event.data.status !== 'success') {
				await db.user.update({
					where: {
						id: event?.data?.metadata.userId,
					},
					data: {
						paystackCurrentPeriodEnd: null,
					},
				})
			}

			return new Response(null, { status: 200 })
		}

		if (event && event.event === 'invoice.update') {
			if (event.data.status === 'success') {
				await db.user.update({
					where: {
						paystackSubscriptionId:
							event?.data?.subscription?.subscription_code,
					},
					data: {
						paystackCurrentPeriodEnd:
							event?.data?.subscription?.next_payment_date,
					},
				})
			}

			return new Response(null, { status: 200 })
		}

		if (event && event.event === 'subscription.disable') {
			await db.user.update({
				where: {
					id: event?.data?.customer.metadata.userId,
				},
				data: {
					paystackSubscriptionId: null,
					paystackCustomerId: null,
					paystackPriceId: null,
					paystackCurrentPeriodEnd: null,
				},
			})

			return new Response(null, { status: 200 })
		}
	} catch (error) {
		console.error('Error processing webhook:', error)
		return new Response(
			`Webhook Error: ${'There was an error from the webhook'}`,
			{ status: 400 }
		)
	}
}

// async function getRawBody(req: Request): Promise<string> {
// 	const chunks: Uint8Array[] = []
// 	const reader = req.body!.getReader()

// 	let done: boolean | undefined
// 	let value: Uint8Array | undefined

// 	// Read the stream chunk by chunk
// 	while (!done) {
// 		;({ done, value } = await reader.read())
// 		if (value) {
// 			chunks.push(value)
// 		}
// 	}

// 	// Concatenate all chunks into a single buffer and convert to string
// 	const rawBody = Buffer.concat(chunks).toString('utf-8')
// 	return rawBody
// }

function getClientIp(req: NextRequest): string {
	// Use the IP provided by the request object (this works for Edge Functions)
	const forwarded = req.headers.get('x-forwarded-for')

	// If behind a proxy, the first IP in the x-forwarded-for is the client's real IP
	return forwarded ? forwarded.split(',')[0].trim() : req.ip || ''
}

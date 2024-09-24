import { db } from '@/db'
import { paystack } from '@/lib/paystack'
import { headers } from 'next/headers'

const crypto = require('crypto')
const secret = 'sk_test_ee41f03dafd9285cf9e8a3c7177175505af705f6'

export async function POST(request: Request) {
	const hash = crypto
		.createHmac('sha512', secret)
		.update(JSON.stringify(request.body))
		.digest('hex')
	const signature = headers().get('x-paystack-signature') ?? ''

	if (hash == signature) {
		// Retrieve the request's body
		const event = request.body
		console.log(event)
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

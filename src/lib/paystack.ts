import { PLANS } from '@/config/paystack'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const paystack = require('paystack')('')

export async function getUserSubscriptionPlan() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id) {
		return {
			...PLANS[0],
			isSubscribed: false,
			isCanceled: false,
			paystackCurrentPeriodEnd: null,
		}
	}

	const dbUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	})

	if (!dbUser) {
		return {
			...PLANS[0],
			isSubscribed: false,
			isCanceled: false,
			paystackCurrentPeriodEnd: null,
		}
	}

	const isSubscribed = Boolean(
		dbUser.paystackPriceId &&
			dbUser.paystackCurrentPeriodEnd && // 86400000 = 1 day
			dbUser.paystackCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
	)

	const plan = isSubscribed
		? PLANS.find((plan) => plan.price.priceIds.test === dbUser.paystackPriceId)
		: null

	let isCanceled = false

	if (isSubscribed && dbUser.paystackSubscriptionId) {
		const paystackPlan = await paystack.subscriptions.get(
			dbUser.paystackSubscriptionId
		)
		paystackPlan.status === 'active'
			? (isCanceled = false)
			: (isCanceled = true)
	}

	return {
		...plan,
		paystackSubscriptionId: dbUser.paystackSubscriptionId,
		paystackCurrentPeriodEnd: dbUser.paystackCurrentPeriodEnd,
		paystackCustomerId: dbUser.paystackCustomerId,
		isSubscribed,
		isCanceled,
	}
}

export const PLANS = [
	{
		name: 'Free',
		slug: 'free',
		quota: 5,
		price: {
			amount: 0,
			priceIds: {
				test: '',
				production: '',
			},
		},
	},
	{
		name: 'Pro',
		slug: 'pro',
		quota: 50,
		price: {
			amount: 9000,
			priceIds: {
				test: process.env.PAYSTACK_PLAN_ID,
				production: process.env.PAYSTACK_PLAN_ID,
			},
		},
	},
]

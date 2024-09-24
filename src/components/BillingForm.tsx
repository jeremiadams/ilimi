'use client'

import { FC, useState } from 'react'
import { getUserSubscriptionPlan } from '@/lib/paystack'
import { useToast } from './ui/use-toast'
import { trpc } from '@/app/_trpc/client'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

interface BillingFormProps {
	subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const BillingForm: FC<BillingFormProps> = ({ subscriptionPlan }) => {
	const { toast } = useToast()
	const [loading, setLoading] = useState(false)

	const { mutate: createPaystackSession } =
		trpc.createPaystackSession.useMutation({
			onSuccess: ({ url }) => {
				setLoading(false)
				if (url) window.location.href = url
				if (!url) {
					toast({
						title: `We've encountered a problem...`,
						description: 'Please try again in a moment',
						variant: 'destructive',
					})
				}
			},
			onMutate: () => {
				setLoading(true)
			},
		})

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<Card>
				<CardHeader>
					<CardTitle>Subscription Plan</CardTitle>
					<CardDescription>
						You are currently on the <strong>{}</strong> plan
					</CardDescription>
				</CardHeader>
				<CardFooter className='flex flex-col gap-3 items-start md:flex-row justify-between md:gap-0'>
					<Button
						size='dashboard'
						variant='hero'
						className='h-10 rounded-md px-5'
					>
						{loading ? (
							<Loader2 className=' animate-spin' />
						) : subscriptionPlan.isSubscribed ? (
							'Cancel subscription'
						) : (
							'Upgrade to PRO'
						)}
					</Button>
					{subscriptionPlan.isSubscribed ? (
						<p className=' rounded-full text-xs font-medium'>
							{subscriptionPlan.isCanceled
								? 'Your subscription will be canceled on'
								: 'Your subscription renews on'}
							{format(subscriptionPlan.paystackCurrentPeriodEnd!, 'dd,MM,yyyy')}
							.
						</p>
					) : null}
				</CardFooter>
			</Card>
		</form>
	)
}

export default BillingForm

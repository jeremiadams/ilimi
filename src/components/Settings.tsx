import { FC } from 'react'
import DashboardLayout from './DashboardNav'
import { getUserSubscriptionPlan } from '@/lib/paystack'
import BillingForm from './BillingForm'

interface SettingsProps {}

const Settings: FC<SettingsProps> = async ({}) => {
	const subscriptionPlan = await getUserSubscriptionPlan()
	console.log(subscriptionPlan)

	return (
		<div>
			<div className='flex flex-col sm:flex-row justify-start gap-4 sm:gap-0 sm:justify-between sm:items-center mb-5'>
				<h1 className=' font-medium text-xl sm:text-lg'>Billing</h1>
			</div>
			<BillingForm subscriptionPlan={subscriptionPlan} />
		</div>
	)
}

export default Settings

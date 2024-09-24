import { FC } from 'react'
import DashboardLayout from './DashboardLayout'
import { getUserSubscriptionPlan } from '@/lib/paystack'
import BillingForm from './BillingForm'

interface SettingsProps {}

const Settings: FC<SettingsProps> = async ({}) => {
	const subscriptionPlan = await getUserSubscriptionPlan()

	return (
		<DashboardLayout>
			<BillingForm subscriptionPlan={subscriptionPlan} />
		</DashboardLayout>
	)
}

export default Settings

import React from 'react'
import { mdiAccountPlusOutline } from '@mdi/js'
import DashboardButton from './DashboardButton'
import Layout from './Layout'

const Dashboard = () => {
	return (
		<Layout>
			<div className="flex flex-wrap mx-10 my-10">
				<div className="w-1/4">
					<DashboardButton icon={mdiAccountPlusOutline} />
				</div>
			</div>
		</Layout>
	)
}

export default Dashboard

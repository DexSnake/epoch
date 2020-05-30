import React from 'react'
import { mdiAccountPlusOutline } from '@mdi/js'
import DashboardButton from './DashboardButton'

const AdminDashboard = ({ userProfile }) => {
	return (
		<div className="flex flex-wrap mx-10 my-10">
			<div className="w-1/4">
				<DashboardButton link="/add-employee" icon={mdiAccountPlusOutline} text="Add New Employee" />
			</div>
		</div>
	)
}

export default AdminDashboard

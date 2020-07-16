import React from 'react'
import {
	mdiAccountPlusOutline,
	mdiAccountGroupOutline,
	mdiCalendarAlert,
	mdiCalendarCheck,
	mdiCalendarRemove
} from '@mdi/js'
import DashboardButton from './DashboardButton'

const AdminDashboard = () => {
	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex flex-wrap mx-10 my-10">
				<DashboardButton link="/employees" icon={mdiAccountGroupOutline} text="Employee List" />
				<DashboardButton link="/add-employee" icon={mdiAccountPlusOutline} text="Add New Employee" />
				<DashboardButton link="/pending-requests" icon={mdiCalendarAlert} text="Pending Requests" />
				<DashboardButton link="/upcoming-requests" icon={mdiCalendarCheck} text="Upcoming Requests" />
				<DashboardButton link="/denied-requests" icon={mdiCalendarRemove} text="Denied Requests" />
			</div>
		</div>
	)
}

export default AdminDashboard

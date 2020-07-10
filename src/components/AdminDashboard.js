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
				<div className="w-1/4 px-3">
					<DashboardButton link="/employees" icon={mdiAccountGroupOutline} text="Employee List" />
				</div>
				<div className="w-1/4 px-3">
					<DashboardButton link="/add-employee" icon={mdiAccountPlusOutline} text="Add New Employee" />
				</div>
				<div className="w-1/4 px-3">
					<DashboardButton link="/pending-requests" icon={mdiCalendarAlert} text="Pending Requests" />
				</div>
				<div className="w-1/4 px-3">
					<DashboardButton link="/upcoming-requests" icon={mdiCalendarCheck} text="Upcoming Requests" />
				</div>
				<div className="w-1/4 px-3 pt-6">
					<DashboardButton link="/denied-requests" icon={mdiCalendarRemove} text="Denied Requests" />
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard

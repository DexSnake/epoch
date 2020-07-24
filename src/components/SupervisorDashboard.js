import React, { useContext } from 'react'
import {
	mdiCalendarPlus,
	mdiAccountEdit,
	mdiCalendarCheck,
	mdiAccountPlusOutline,
	mdiAccountGroupOutline,
	mdiCalendarAlert,
	mdiCalendarRemove
} from '@mdi/js'
import DashboardButton from './DashboardButton'
import { AuthContext } from '../context/Auth'

const SupervisorDashboard = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex flex-wrap m-4 sm:m-10">
				<DashboardButton
					link={{ pathname: `/employee/edit/${currentUser.uid}`, state: { id: currentUser.uid } }}
					icon={mdiAccountEdit}
					text="Edit Your Profile"
				/>
				<DashboardButton link="/requests" icon={mdiCalendarCheck} text="View My Requests" />
				<DashboardButton link="/add-request" icon={mdiCalendarPlus} text="Submit New Request" />
				<DashboardButton link="/add-employee" icon={mdiAccountPlusOutline} text="Add New Employee" />
				<DashboardButton link="/employees" icon={mdiAccountGroupOutline} text="Employee List" />
				<DashboardButton link="/pending-requests" icon={mdiCalendarAlert} text="Pending Requests" />
				<DashboardButton link="/upcoming-requests" icon={mdiCalendarCheck} text="Upcoming Requests" />
				<DashboardButton link="/denied-requests" icon={mdiCalendarRemove} text="Denied Requests" />
			</div>
		</div>
	)
}

export default SupervisorDashboard

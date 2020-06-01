import React from 'react'
import { mdiCalendarPlus } from '@mdi/js'
import DashboardButton from './DashboardButton'

const UserDashboard = ({ userProfile }) => {
	return (
		<div className="flex flex-wrap mx-10 my-10">
			<div className="w-1/4">
				<DashboardButton link="/new-request" icon={mdiCalendarPlus} text="Submit New Request" />
			</div>
		</div>
	)
}

export default UserDashboard

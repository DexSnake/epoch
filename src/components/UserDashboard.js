import React from 'react'
import { mdiCalendarCheck } from '@mdi/js'
import DashboardButton from './DashboardButton'

const UserDashboard = ({ userProfile }) => {
	return (
		<div className="flex flex-wrap mx-10 my-10">
			<div className="w-1/4">
				<DashboardButton link="/new-request" icon={mdiCalendarCheck} text="Submit New Request" />
			</div>
		</div>
	)
}

export default UserDashboard

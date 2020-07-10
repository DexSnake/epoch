import React, { useContext } from 'react'
import { mdiCalendarPlus, mdiAccountEdit, mdiCalendarCheck } from '@mdi/js'
import DashboardButton from './DashboardButton'
import { AuthContext } from '../context/Auth'

const UserDashboard = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex flex-wrap mx-10 my-10">
				<div className="w-1/4 px-3">
					<DashboardButton link="/requests" icon={mdiCalendarCheck} text="View My Requests" />
				</div>
				<div className="w-1/4 px-3">
					<DashboardButton link="/new-request" icon={mdiCalendarPlus} text="Submit New Request" />
				</div>
				<div className="w-1/4 px-3">
					<DashboardButton
						link={{ pathname: `/employees/edit/${currentUser.uid}`, state: { id: currentUser.uid } }}
						icon={mdiAccountEdit}
						text="Edit Your Profile"
					/>
				</div>
			</div>
		</div>
	)
}

export default UserDashboard

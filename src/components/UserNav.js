import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccount, mdiMonitorDashboard, mdiCalendarPlus, mdiCalendarAccount } from '@mdi/js'
import { AuthContext } from '../context/Auth'

const UserNav = () => {
	const { currentUser, userProfile } = useContext(AuthContext)

	return (
		<ul>
			<Link to="/dashboard">
				<li className="text-purp-light mb-3">
					<Icon path={mdiMonitorDashboard} size={1} className="mr-2 inline pb-1" />
					Dashboard
				</li>
			</Link>
			<Link
				to={{
					pathname: `/employees/edit/${currentUser.uid}`,
					state: { data: userProfile },
				}}>
				<li className="text-purp-light mb-3">
					<Icon path={mdiAccount} size={1} className="mr-2 inline pb-1" />
					My Profile
				</li>
			</Link>
			<Link to="/new-request">
				<li className="text-purp-light mb-3">
					<Icon path={mdiCalendarPlus} size={1} className="mr-2 inline pb-1" />
					New Request
				</li>
			</Link>
			<Link to="/requests">
				<li className="text-purp-light mb-3">
					<Icon path={mdiCalendarAccount} size={1} className="mr-2 inline pb-1" />
					My Requests
				</li>
			</Link>
		</ul>
	)
}

export default UserNav

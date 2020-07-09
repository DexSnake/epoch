import React, { useContext } from 'react'
import { mdiAccount, mdiMonitorDashboard, mdiCalendarPlus, mdiCalendarAccount } from '@mdi/js'
import { AuthContext } from '../../context/Auth'
import NavLink from './NavLink'

const UserNav = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<ul>
			<NavLink linkTo="/" icon={mdiMonitorDashboard} text="Dashboard" />
			<NavLink
				linkTo={{
					pathname: `/employees/edit/${currentUser.uid}`,
					state: { id: currentUser.uid }
				}}
				icon={mdiAccount}
				text="My Profile"
			/>
			<NavLink linkTo="new-requests" icon={mdiCalendarPlus} text="New Request" />
			<NavLink linkTo="/requests" icon={mdiCalendarAccount} text="My Request" />
		</ul>
	)
}

export default UserNav

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccount, mdiMonitorDashboard, mdiCalendarPlus, mdiCalendarAccount } from '@mdi/js'
import { AuthContext } from '../../../context/Auth'
import NavLink from './NavLink'

const UserNav = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<ul className="flex flex-wrap justify-between px-4 py-3 md:px-0 md:py-0 md:block">
			<NavLink linkTo="" icon={mdiMonitorDashboard} text="Dashboard" />
			<Link
				className="focus:outline-none cursor-pointer"
				to={{
					pathname: `/employees/edit/${currentUser.uid}`,
					state: { id: currentUser.uid }
				}}
			>
				<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiAccount} size={0.8} className="mr-2" />
					My Profile
				</li>
			</Link>
			<NavLink linkTo="new-request" icon={mdiCalendarPlus} text="New Request" />
			<NavLink linkTo="requests" icon={mdiCalendarAccount} text="My Requests" />
		</ul>
	)
}

export default UserNav

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccount, mdiMonitorDashboard, mdiCalendarPlus, mdiCalendarAccount, mdiClock } from '@mdi/js'
import { AuthContext } from '../../../context/Auth'
import NavLink from './NavLink'

const UserNav = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<ul className="flex flex-wrap justify-between px-4 py-3 md:px-0 md:py-0 md:block">
			<NavLink linkTo="" icon={mdiMonitorDashboard} text="Dashboard" />
			<NavLink linkTo="time-clock" icon={mdiClock} text="Time Clock" />
			<Link
				className="focus:outline-none cursor-pointer"
				to={{
					pathname: `/employee/edit/${currentUser.uid}`,
					state: { id: currentUser.uid }
				}}
			>
				<li className="text-purp-light md:py-2 md:pl-6 md:pr-8 relative focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiAccount} size={0.8} className="md:mr-2" />
					<span className="hidden md:inline">My Profile</span>
				</li>
			</Link>
			<NavLink linkTo="add-request" icon={mdiCalendarPlus} text="New Request" />
			<NavLink linkTo="requests" icon={mdiCalendarAccount} text="My Requests" />
		</ul>
	)
}

export default UserNav

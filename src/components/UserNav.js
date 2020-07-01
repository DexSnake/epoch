import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccount, mdiMonitorDashboard, mdiCalendarPlus, mdiCalendarAccount } from '@mdi/js'
import { AuthContext } from '../context/Auth'

const UserNav = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<ul>
			<Link to="/" className="focus:outline-none">
				<li className="text-purp-light mb-3 focus:outline-none">
					<Icon path={mdiMonitorDashboard} size={1} className="mr-2 inline pb-1" />
					Dashboard
				</li>
			</Link>
			<Link
				className="focus:outline-none"
				to={{
					pathname: `/employees/edit/${currentUser.uid}`,
					state: { id: currentUser.uid },
				}}>
				<li className="text-purp-light mb-3 focus:outline-none">
					<Icon path={mdiAccount} size={1} className="mr-2 inline pb-1" />
					My Profile
				</li>
			</Link>
			<Link to="/new-request" className="focus:outline-none">
				<li className="text-purp-light mb-3 focus:outline-none">
					<Icon path={mdiCalendarPlus} size={1} className="mr-2 inline pb-1" />
					New Request
				</li>
			</Link>
			<Link to="/requests" className="focus:outline-none">
				<li className="text-purp-light mb-3 focus:outline-none">
					<Icon path={mdiCalendarAccount} size={1} className="mr-2 inline pb-1" />
					My Requests
				</li>
			</Link>
		</ul>
	)
}

export default UserNav

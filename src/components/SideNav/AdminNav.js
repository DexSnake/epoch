import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { db } from '../../firebase/firebase'
import {
	mdiAccountPlus,
	mdiAccountGroup,
	mdiMonitorDashboard,
	mdiCalendarAlert,
	mdiCalendarCheck,
	mdiCalendarRemove
} from '@mdi/js'
import NavLink from './NavLink'

const AdminNav = () => {
	const [requests, setRequests] = useState([])

	useEffect(() => {
		db.collection('Requests')
			.where('status', '==', 'pending')
			.get()
			.then((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}))
				setRequests(newRequests)
			})
	}, [])

	return (
		<ul>
			<NavLink linkTo="" icon={mdiMonitorDashboard} text="Dashboard" />
			<NavLink linkTo="add-employee" icon={mdiAccountPlus} text="Add Employee" />
			<NavLink linkTo="employees" icon={mdiAccountGroup} text="Employee List" />
			<Link to="/pending-requests" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 relative focus:outline-none hover:bg-purp-dark flex items-center">
					{requests.length > 0 ? (
						<p className="font-semibold text-sm absolute top-neg-10 right-35 h-6 w-6 bg-red-500 text-white flex items-center justify-center rounded-full">
							{requests.length}
						</p>
					) : null}
					<Icon path={mdiCalendarAlert} size={0.8} className="mr-2" />
					Pending Requests
				</li>
			</Link>
			<NavLink linkTo="upcoming-requests" icon={mdiCalendarCheck} text="Upcoming Requests" />
			<NavLink linkTo="denied-requests" icon={mdiCalendarRemove} text="Denied Requests" />
		</ul>
	)
}

export default AdminNav

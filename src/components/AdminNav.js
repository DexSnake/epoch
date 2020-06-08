import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { db } from '../firebase/firebase'
import { mdiAccountPlus, mdiAccountGroup, mdiMonitorDashboard, mdiCalendarImport, mdiCalendarCheck, mdiCalendarMinus } from '@mdi/js'

const AdminNav = () => {
	const [requests, setRequests] = useState([])

	useEffect(() => {
		db.collection('Requests')
			.where('status', '==', 'pending')
			.get()
			.then((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setRequests(newRequests)
			})
	}, [])

	return (
		<ul>
			<Link to="/">
				<li className="text-purp-light mb-3">
					<Icon path={mdiMonitorDashboard} size={1} className="mr-2 inline pb-1" />
					Dashboard
				</li>
			</Link>
			<Link to="/add-employee">
				<li className="text-purp-light mb-3">
					<Icon path={mdiAccountPlus} size={1} className="mr-2 inline pb-1" />
					Add Employee
				</li>
			</Link>
			<Link to="/employees">
				<li className="text-purp-light mb-3">
					<Icon path={mdiAccountGroup} size={1} className="mr-2 inline pb-1" />
					Employee List
				</li>
			</Link>
			<Link to="/pending-requests">
				<li className="text-purp-light mb-3 relative">
					{requests.length > 0 ? <p className="font-semibold text-sm absolute top-neg-10 right-35 h-6 w-6 bg-red-500 text-white flex items-center justify-center rounded-full">{requests.length}</p> : null}
					<Icon path={mdiCalendarImport} size={1} className="mr-2 inline pb-1" />
					Pending Requests
				</li>
			</Link>
			<Link to="/approved-requests">
				<li className="text-purp-light mb-3">
					<Icon path={mdiCalendarCheck} size={1} className="mr-2 inline pb-1" />
					Approved Requests
				</li>
			</Link>
			<Link to="/denied-requests">
				<li className="text-purp-light mb-3">
					<Icon path={mdiCalendarMinus} size={1} className="mr-2 inline pb-1" />
					Denied Requests
				</li>
			</Link>
		</ul>
	)
}

export default AdminNav

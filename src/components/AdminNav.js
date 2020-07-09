import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { db } from '../firebase/firebase'
import { mdiAccountPlus, mdiAccountGroup, mdiMonitorDashboard, mdiCalendarAlert, mdiCalendarCheck, mdiCalendarRemove } from '@mdi/js'

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
			<Link to="/" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiMonitorDashboard} size={0.8} className="mr-2" />
					Dashboard
				</li>
			</Link>
			<Link to="/add-employee" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiAccountPlus} size={0.8} className="mr-2" />
					Add Employee
				</li>
			</Link>
			<Link to="/employees" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiAccountGroup} size={0.8} className="mr-2" />
					Employee List
				</li>
			</Link>
			<Link to="/pending-requests" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 relative focus:outline-none hover:bg-purp-dark flex items-center">
					{requests.length > 0 ? <p className="font-semibold text-sm absolute top-neg-10 right-35 h-6 w-6 bg-red-500 text-white flex items-center justify-center rounded-full">{requests.length}</p> : null}
					<Icon path={mdiCalendarAlert} size={0.8} className="mr-2" />
					Pending Requests
				</li>
			</Link>
			<Link to="/upcoming-requests" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiCalendarCheck} size={0.8} className="mr-2" />
					Upcoming Requests
				</li>
			</Link>
			<Link to="/denied-requests" className="focus:outline-none">
				<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
					<Icon path={mdiCalendarRemove} size={0.8} className="mr-2" />
					Denied Requests
				</li>
			</Link>
		</ul>
	)
}

export default AdminNav

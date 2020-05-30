import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccountPlus, mdiAccountGroup, mdiMonitorDashboard } from '@mdi/js'

const AdminNav = () => {
	return (
		<ul>
			<Link to="/dashboard">
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
				<li className="text-purp-light">
					<Icon path={mdiAccountGroup} size={1} className="mr-2 inline pb-1" />
					Employee List
				</li>
			</Link>
		</ul>
	)
}

export default AdminNav

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccountPlus, mdiAccountGroup, mdiMonitorDashboard } from '@mdi/js'
import AddEmployeeModal from './AddEmployeeModal'

const AdminNav = () => {
	const [showModal, setShowModal] = useState(false)

	const handleModal = (modalState) => {
		setShowModal(modalState)
	}
	return (
		<React.Fragment>
			<ul>
				<Link to="/dashboard">
					<li className="text-purp-light mb-3">
						<Icon path={mdiMonitorDashboard} size={1} className="mr-2 inline pb-1" />
						Dashboard
					</li>
				</Link>
				<button onClick={() => setShowModal(true)}>
					<li className="text-purp-light mb-3">
						<Icon path={mdiAccountPlus} size={1} className="mr-2 inline pb-1" />
						Add Employee
					</li>
				</button>
				<Link to="/employees">
					<li className="text-purp-light">
						<Icon path={mdiAccountGroup} size={1} className="mr-2 inline pb-1" />
						Employee List
					</li>
				</Link>
			</ul>
			<AddEmployeeModal showModal={showModal} onUpdate={handleModal} />
		</React.Fragment>
	)
}

export default AdminNav

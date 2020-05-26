import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccountGroup, mdiAccountPlus } from '@mdi/js'
import AddEmployeeModal from './AddEmployeeModal'

const Layout = (props) => {
	const [showModal, setShowModal] = useState(false)

	const handleModal = (modalState) => {
		setShowModal(modalState)
	}

	return (
		<React.Fragment>
			<div className="flex flex-col min-h-screen">
				<header>
					<div className="mx-auto bg-purp-dark py-3 px-6 flex justify-between">
						<p className="text-white font-bold">KSTG PTO Tracker</p>
						<Link to="/dashboard">
							<p className="text-purp-light hover:text-white">Dashboard</p>
						</Link>
					</div>
				</header>
				<main className="flex flex-grow">
					<div className="bg-purp-normal w-64 py-10 px-4">
						<ul>
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
					</div>
					<div className="bg-purp-lightest flex-grow">{props.children}</div>
				</main>
			</div>
			<AddEmployeeModal showModal={showModal} onUpdate={handleModal} />
		</React.Fragment>
	)
}

export default Layout

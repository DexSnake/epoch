import React, { useState } from 'react'
import Icon from '@mdi/react'
import AddEmployeeModal from './AddEmployeeModal'

const DashboardButton = (props) => {
	const [showModal, setShowModal] = useState(false)

	const handleModal = (modalState) => {
		setShowModal(modalState)
	}

	return (
		<React.Fragment>
			<button onClick={() => setShowModal(true)} className="group w-full bg-white h-40 flex items-center justify-center flex-col focus:outline-none hover:shadow transition duration-200 ease">
				<Icon path={props.icon} size={3} color="#414255" className="opacity-25 group-hover:opacity-100 transition duration-200 ease-in-out" />
				<span className="text-purp-normal opacity-25 group-hover:opacity-100 transition duration-200 ease">Add New Employee</span>
			</button>
			<AddEmployeeModal showModal={showModal} onUpdate={handleModal} />
		</React.Fragment>
	)
}

export default DashboardButton

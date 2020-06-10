import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { AuthContext } from '../../context/Auth'
import { TextInput, Label } from '../FormFields'
import Icon from '@mdi/react'
import { mdiDelete } from '@mdi/js'

const EmergencyContacts = () => {
	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [{ emergencyContacts }, setState] = useState(employeeProfile)
	const [showRemoveContactModal, setShowRemoveContactModal] = useState(false)
	const [modalIndex, setModalIndex] = useState(null)

	const data = { emergencyContacts }

	useEffect(() => {
		setState(employeeProfile)
	}, [employeeProfile])

	useEffect(() => {
		updateEmployeeProfile(data)
	}, [emergencyContacts])

	// Function to handle the onChange events for the emergency contacts
	const handleEcChange = (e, i) => {
		const { name, value } = e.target
		let newEc = [...emergencyContacts]
		newEc[i][name] = value
		setState((prevState) => ({ ...prevState, emergencyContacts: newEc }))
	}

	// Function to add and emergency contact
	const addEmergencyContact = () => {
		let Ec = [...emergencyContacts]
		let newEc = { firstName: '', lastName: '', relationship: '', phoneNumber: '' }
		Ec.push(newEc)
		setState((prevState) => ({ ...prevState, emergencyContacts: Ec }))
	}

	// Function to remove an emergency contact
	const removeEmergencyContact = (i) => {
		let Ec = [...emergencyContacts]
		Ec.splice(i, 1)
		setState((prevState) => ({ ...prevState, emergencyContacts: Ec }))
		setShowRemoveContactModal(false)
		setModalIndex(null)
	}

	// Function to handle the closing of the remove emergency contact modal
	const handleCancel = () => {
		setShowRemoveContactModal(false)
		setModalIndex(null)
	}

	return (
		<EmployeeInfoContainer>
			<div className="p-8">
				<div className="flex justify-between">
					<p className="uppercase text-purp-normal font-semibold">Emergency Contacts</p>
					<button className="bg-purp-normal text-white font-semibold text-sm px-3 py-2 rounded hover:bg-purp-dark outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={addEmergencyContact}>
						Add Contact
					</button>
				</div>
				{emergencyContacts
					? emergencyContacts.map((ec, i) => {
							return (
								<div key={i}>
									<div className="flex mb-3 mt-6">
										<p className="uppercase text-purp-normal text-sm font-semibold">Contact #{i + 1} </p>
										<button
											className="text-purp-medium ml-1 hover:text-red-600 focus:outline-none transition duration-200 ease"
											onClick={() => {
												setShowRemoveContactModal(true)
												setModalIndex(i)
											}}>
											<Icon path={mdiDelete} size={0.7} />
										</button>
									</div>
									<div className="flex">
										<div className="w-1/4 px-3">
											<Label name="First Name" htmlFor="firstName" />
											<TextInput name="firstName" value={ec.firstName} onChange={(e) => handleEcChange(e, i)} />
										</div>
										<div className="w-1/4 px-3">
											<Label name="Last Name" htmlFor="lastName" />
											<TextInput name="lastName" value={ec.lastName} onChange={(e) => handleEcChange(e, i)} />
										</div>
										<div className="w-1/4 px-3">
											<Label name="Relationship" htmlFor="relationship" />
											<TextInput name="relationship" value={ec.relationship} onChange={(e) => handleEcChange(e, i)} />
										</div>
										<div className="w-1/4 px-3">
											<Label name="Phone Number" htmlFor="phoneNumber" />
											<TextInput name="phoneNumber" value={ec.phoneNumber} onChange={(e) => handleEcChange(e, i)} />
										</div>
									</div>
								</div>
							)
					  })
					: null}
			</div>
		</EmployeeInfoContainer>
	)
}

export default EmergencyContacts

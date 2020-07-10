import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { AuthContext } from '../../context/Auth'
import { TextInput, Label } from '../FormFields'
import NumberFormat from 'react-number-format'
import Icon from '@mdi/react'
import { mdiDelete, mdiAccountPlus } from '@mdi/js'

const EmergencyContacts = () => {
	const { employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
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
		<React.Fragment>
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between pt-8 px-10">
					<p className="uppercase text-purp-normal font-semibold">Emergency Contacts</p>
					<button
						className="text-purp-brightest hover:text-purp-bright font-semibold text-sm outline-none focus:outline-none transition duration-200 ease"
						onClick={addEmergencyContact}
					>
						<Icon path={mdiAccountPlus} size={0.8} className="inline mr-1 pb-1" />
						Add Contact
					</button>
				</div>
				<div className="flex flex-wrap">
					{emergencyContacts
						? emergencyContacts.map((ec, i) => {
								return (
									<div className="w-1/2" key={i}>
										<EmployeeInfoContainer>
											<div className="pb-8 px-8">
												<div>
													<div className="flex mb-3 mt-6">
														<p className="uppercase text-purp-normal text-sm font-semibold">
															Contact #{i + 1}{' '}
														</p>
														<button
															className="text-purp-medium ml-1 hover:text-red-600 focus:outline-none transition duration-200 ease"
															onClick={() => {
																setShowRemoveContactModal(true)
																setModalIndex(i)
															}}
														>
															<Icon path={mdiDelete} size={0.7} />
														</button>
													</div>
													<div className="flex flex-wrap">
														<div className="w-1/2 px-3 pb-6">
															<Label name="First Name" htmlFor="firstName" />
															<TextInput
																name="firstName"
																value={ec.firstName}
																onChange={(e) => handleEcChange(e, i)}
															/>
														</div>
														<div className="w-1/2 px-3 pb-6">
															<Label name="Last Name" htmlFor="lastName" />
															<TextInput
																name="lastName"
																value={ec.lastName}
																onChange={(e) => handleEcChange(e, i)}
															/>
														</div>
														<div className="w-1/2 px-3">
															<Label name="Relationship" htmlFor="relationship" />
															<TextInput
																name="relationship"
																value={ec.relationship}
																onChange={(e) => handleEcChange(e, i)}
															/>
														</div>
														<div className="w-1/2 px-3">
															<Label name="Phone Number" htmlFor="phoneNumber" />
															<NumberFormat
																format="(###) ###-####"
																name="phoneNumber"
																value={ec.phoneNumber}
																onChange={(e) => handleEcChange(e, i)}
																className="w-full text-purp-normal focus:outline-none border-b pb-1 px-2 disabled:bg-white"
															/>
														</div>
													</div>
												</div>
											</div>
										</EmployeeInfoContainer>
									</div>
								)
						  })
						: null}
				</div>
				{showRemoveContactModal ? (
					<>
						<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
							<div className="relative w-auto my-6 mx-auto max-w-3xl">
								<div
									className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none"
									style={{ maxHeight: '80vh' }}
								>
									<div className="flex items-start p-5 rounded-t bg-purp-lightest">
										<h3 className="text-2xl text-purp-normal">Remove Contact?</h3>
										<button
											className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition duration-300 ease transform hover:rotate-45"
											onClick={() => setShowRemoveContactModal(false)}
										>
											<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
												×
											</span>
										</button>
									</div>
									<div className="relative p-6 flex-auto">
										<div className="flex flex-col">
											<p className="mb-3">
												Are you sure you want to remove this emergency contact?
											</p>
											<p>This action cannot be un-done.</p>
										</div>
									</div>
									<div className="flex items-center justify-end px-5 pb-5 rounded-b">
										<button
											className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease"
											onClick={handleCancel}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease"
											onClick={() => removeEmergencyContact(modalIndex)}
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</>
				) : null}
			</div>
		</React.Fragment>
	)
}

export default EmergencyContacts

import React, { useState, useEffect, useContext } from 'react'
import Layout from '../Layout'
import { db, storage, functions } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from '@mdi/react'
import { mdiLoading, mdiEyeCheck, mdiEyeMinus, mdiDelete } from '@mdi/js'
import moment from 'moment'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { Label, TextInput, Select, DateInput } from '../FormFields'
import { AuthContext } from '../../context/Auth'
import EmployeeHeader from '../EmployeeHeader'
import RemoveEmployeeModal from '../modals/RemoveEmployeeModal'
import NumberFormat from 'react-number-format'

const EditEmployee = (props) => {
	const { userProfile, currentUser } = useContext(AuthContext)

	// useEffect(() => {
	// 	setState((prevState) => ({ ...prevState, profileImage: null, dateOfBirth: moment(dateOfBirth.toDate()).format('YYYY-MM-DD'), startDate: moment(startDate.toDate()).format('YYYY-MM-DD') }))
	// }, [])

	const data = props.location.state.data
	const [
		{
			id,
			firstName,
			lastName,
			middleName,
			startDate,
			dateOfBirth,
			ssn,
			title,
			ethnicity,
			gender,
			imageUrl,
			profileImage,
			maritalStatus,
			phoneNumber,
			alternatePhoneNumber,
			email,
			address1,
			address2,
			city,
			state,
			zipCode,
			salary,
			salaryRate,
			emergencyContacts,
			pto,
		},
		setState,
	] = useState(data)
	const [saving, setSaving] = useState(false)
	const [removing, setRemoving] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showRemoveEmployeeModal, setShowRemoveEmployeeModal] = useState(false)
	const [showRemoveContactModal, setShowRemoveContactModal] = useState(false)
	const [showSsn, setShowSsn] = useState(false)
	const [modalIndex, setModalIndex] = useState(null)
	const [requests, setRequests] = useState([])
	const disableUser = functions.httpsCallable('disableUser')

	// Data variable to send to the EmployeeHeader component
	const EmployeeHeaderData = { userProfile, showSsn, firstName, lastName, ssn, title, startDate, dateOfBirth, imageUrl, salary, salaryRate }

	// Function to handle the onChange events for the inputs
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

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

	// Function to handle the onChange event of the dateOfBirth input
	const handleDobChange = (dateOfBirth) => {
		setState((prevState) => ({ ...prevState, dateOfBirth }))
	}

	// Function to handle the onChange event of the dateOfBirth input
	const handlePtoChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, pto: { [name]: parseInt(value), pendingHours: pto.pendingHours, usedHours: pto.usedHours } }))
	}

	// Function to handle the onChange event of the startDate input
	const handleStartDateChange = (startDate) => {
		setState((prevState) => ({ ...prevState, startDate }))
	}

	// Function to set the state of profileImage
	const handleFile = (e) => {
		const { name, files } = e.target
		setState((prevState) => ({ ...prevState, [name]: files[0] }))
	}

	// Calls the handleUpload function when a new profileImage is selected from the file explorer
	useEffect(() => {
		if (profileImage) {
			handleUpload()
		}
	}, [profileImage])

	// Function that uploads the new profileImage to Firebase then sets the new file url as imageUrl
	const handleUpload = () => {
		const uploadTask = storage.ref(`employee-photos/${profileImage.name}`).put(profileImage)
		uploadTask.on(
			'state_changed',
			(snapshot) => {},
			(error) => {
				console.log(error)
			},
			() => {
				storage
					.ref('employee-photos')
					.child(profileImage.name)
					.getDownloadURL()
					.then((url) => {
						setState((prevState) => ({ ...prevState, imageUrl: url }))
					})
			}
		)
	}

	// Function that gets called when save button is clicked. Uploads the current state of all values to Firebase
	const handleUpdate = (e) => {
		e.preventDefault()
		setSaving(true)
		db.collection('Employees')
			.doc(id)
			.update({
				firstName,
				lastName,
				middleName,
				dateOfBirth: new Date(dateOfBirth),
				startDate: new Date(startDate),
				ssn,
				imageUrl,
				title,
				ethnicity,
				gender,
				maritalStatus,
				phoneNumber,
				alternatePhoneNumber,
				email,
				address1,
				address2,
				city,
				state,
				zipCode,
				salary,
				salaryRate,
				emergencyContacts,
				pto,
			})
			.then(function () {
				toast.success('Profile Saved!')
				setSaving(false)
			})
			.catch(function (error) {
				toast.error(error)
			})
	}

	// Function that gets called when the remove button inside the RemoveEmployeeModal components gets clicked
	const handleDelete = () => {
		setLoading(true)
		disableUser({ id: data.id }).then(() => {
			db.collection('Requests')
				.where('userId', '==', data.id)
				.get()
				.then((snapshot) => {
					const batch = db.batch()

					snapshot.forEach((doc) => {
						batch.delete(doc.ref)
					})
					return batch.commit()
				})
				.then(() => {
					db.collection('Employees')
						.doc(data.id)
						.update({
							isActive: false,
							updatedAt: new Date(),
						})
						.then(function () {
							setLoading(false)
							setShowRemoveEmployeeModal(false)
							props.history.push('/employees')
						})
				})
		})
	}

	// Gets passed to RemoveEmployeeModal component
	const handleShowRemoveEmployeeModal = () => {
		setShowRemoveEmployeeModal(true)
	}

	// Gets passed to RemoveEmployeeModal component
	const handleCloseRemoveEmployeeModal = () => {
		setShowRemoveEmployeeModal(false)
	}

	// Gets passed to RemoveEmployeeModal component
	const handleShowSsn = () => {
		setShowSsn(!showSsn)
	}

	useEffect(() => {
		db.collection('Requests')
			.where('userId', '==', data.id)
			.onSnapshot((snapshot) => {
				const requests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setRequests(requests)
			})
	}, [])

	const handleApprove = (id, userId, numberOfHours) => {
		db.collection('Requests')
			.doc(id)
			.update({
				status: 'approved',
			})
			.then(() => {
				db.collection('Employees')
					.doc(userId)
					.get()
					.then((doc) => {
						db.collection('Employees')
							.doc(userId)
							.update({
								pto: {
									availableHours: doc.data().pto.availableHours - numberOfHours,
									pendingHours: doc.data().pto.pendingHours - numberOfHours,
									usedHours: doc.data().pto.usedHours + numberOfHours,
								},
							})
							.then(() => {
								toast.success('Request Approved!')
							})
							.catch((err) => {
								console.log(err)
							})
					})
					.catch((err) => {
						console.log(err)
					})
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const handleDeny = (id, userId, numberOfHours) => {
		db.collection('Requests')
			.doc(id)
			.update({
				status: 'denied',
			})
			.then(() => {
				db.collection('Employees')
					.doc(userId)
					.get()
					.then((doc) => {
						db.collection('Employees')
							.doc(userId)
							.update({
								pto: {
									availableHours: doc.data().pto.availableHours,
									pendingHours: doc.data().pto.pendingHours - numberOfHours,
									usedHours: doc.data().pto.usedHours,
								},
							})
							.then(() => {
								toast.error('Request Denied.')
							})
							.catch((err) => {
								console.log(err)
							})
					})
					.catch((err) => {
						console.log(err)
					})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<Layout>
			<EmployeeHeader data={EmployeeHeaderData} handleFile={handleFile} showModal={handleShowRemoveEmployeeModal} showSsn={handleShowSsn} />
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Time Off Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Available Hours" htmlFor="availableHours" />
							<TextInput name="availableHours" disabled={!currentUser.isAdmin} value={pto.availableHours} onChange={handlePtoChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Pending Hours" htmlFor="pendingHours" />
							<TextInput name="pendingHours" disabled value={pto.pendingHours} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Hours Used" htmlFor="usedHours" />
							<TextInput name="usedHours" disabled value={pto.usedHours} />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			{currentUser.isAdmin ? (
				<EmployeeInfoContainer>
					<div className="p-8">
						<p className="uppercase text-purp-normal font-semibold mb-5">Pending Requests</p>
						{requests.length > 0 ? (
							requests
								.filter((request) => request.status === 'pending')
								.sort((a, b) => (a.dates[1] > b.dates[1] ? 1 : -1))
								.map((request) => {
									return request.requestType === 'singleDay' ? (
										<div className="p-6 bg-purp-lightest shadow rounded mb-3 border-l-4 border-yellow-400" key={request.id}>
											<div className="flex">
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Date</p>
													<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Start Time</p>
													<p>{request.startTime}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Total Hours</p>
													<p>{request.numberOfHours}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Status</p>
													<span className="text-sm text-white px-2 py-1 rounded bg-yellow-400">pending</span>
												</div>
												<div className="w-1/5 px-3">
													<button className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
														Approved Request
													</button>
													<button className="ml-3 hover:text-red-600 text-purp-medium font-semibold transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
														Deny Request
													</button>
												</div>
											</div>
										</div>
									) : (
										<div className="p-6 bg-purp-lightest shadow rounded mb-3 border-l-4 border-yellow-400" key={request.id}>
											<div className="flex items-center">
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Start Date</p>
													<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">End Date</p>
													<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Total Hours</p>
													<p>{request.numberOfHours}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Status</p>
													<span className="text-sm text-white px-2 py-1 rounded bg-yellow-400">pending</span>
												</div>
												<div className="w-1/5 px-3">
													<button className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
														Approved Request
													</button>
													<button className="ml-3 hover:text-red-600 text-purp-medium font-semibold transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
														Deny Request
													</button>
												</div>
											</div>
										</div>
									)
								})
						) : (
							<p className="text-purp-medium font-semibold">{firstName} does not have any pending requests.</p>
						)}
					</div>
				</EmployeeInfoContainer>
			) : null}
			{currentUser.isAdmin ? (
				<EmployeeInfoContainer>
					<div className="p-8">
						<p className="uppercase text-purp-normal font-semibold mb-5">Upcoming Requests</p>
						{requests.length > 0 ? (
							requests
								.filter((request) => request.status === 'approved')
								.sort((a, b) => (a.dates[0] > b.dates[0] ? 1 : -1))
								.map((request) => {
									return request.requestType === 'singleDay' ? (
										<div className="p-6 bg-purp-lightest shadow rounded mb-3 border-l-4 border-green-400" key={request.id}>
											<div className="flex">
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Date</p>
													<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Start Time</p>
													<p>{request.startTime}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Total Hours</p>
													<p>{request.numberOfHours}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Status</p>
													<span className="text-sm text-white px-2 py-1 rounded bg-green-400">approved</span>
												</div>
												<div className="w-1/5 px-3">
													<button className="ml-1 bg-red-500 hover:bg-red-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
														Change to Denied
													</button>
												</div>
											</div>
										</div>
									) : (
										<div className="p-6 bg-purp-lightest shadow rounded mb-3 border-l-4 border-green-400" key={request.id}>
											<div className="flex items-center">
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Start Date</p>
													<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">End Date</p>
													<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Total Hours</p>
													<p>{request.numberOfHours}</p>
												</div>
												<div className="w-1/5 px-3">
													<p className="text-purp-normal font-semibold">Status</p>
													<span className="text-sm text-white px-2 py-1 rounded bg-green-400">approved</span>
												</div>
												<div className="w-1/5 px-3">
													<button className="ml-1 bg-red-500 hover:bg-red-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
														Change to Denied
													</button>
												</div>
											</div>
										</div>
									)
								})
						) : (
							<p className="text-purp-medium font-semibold">{firstName} does not have any upcoming requests.</p>
						)}
					</div>
				</EmployeeInfoContainer>
			) : null}
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Personal Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="First Name" htmlFor="firstName" />
							<TextInput name="firstName" disabled={!currentUser.isAdmin} value={firstName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Middle Name" htmlFor="middleName" />
							<TextInput name="middleName" disabled={!currentUser.isAdmin} value={middleName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Last Name" htmlFor="lastName" />
							<TextInput name="lastName" disabled={!currentUser.isAdmin} value={lastName} onChange={handleChange} />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="DOB" htmlFor="dob" />
							<DateInput name="dateOfBirth" value={dateOfBirth} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3 relative">
							<Label name="SSN" htmlFor="ssn" />
							{showSsn ? (
								<NumberFormat format="###-##-####" disabled={!currentUser.isAdmin} name="ssn" value={ssn} onChange={handleChange} className="w-full text-purp-normal border-b pb-1 px-2 disabled:bg-white" />
							) : (
								<TextInput name="ssn" disabled value="XXX-XX-XXXX" />
							)}
							<Icon path={showSsn ? mdiEyeMinus : mdiEyeCheck} size={1} color="#414255" className="pb-1 inline ml-2 cursor-pointer absolute right-20" onClick={() => setShowSsn(!showSsn)} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Gender" htmlFor="gender" />
							<Select name="gender" value={gender} onChange={handleChange}>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</Select>
						</div>
						<div className="w-1/5 px-3">
							<Label name="Ethnicity" htmlFor="ethnicity" />
							<Select name="ethnicity" value={ethnicity} onChange={handleChange}>
								<option value="American Indian">American Indian</option>
								<option value="Asian">Asian</option>
								<option value="Black">Black</option>
								<option value="Hispanic">Hispanic</option>
								<option value="Two or More Races">Two or More Races</option>
								<option value="Unknown">Unknown</option>
								<option value="White/Caucasian">White/Caucasian</option>
							</Select>
						</div>
						<div className="w-1/5 px-3">
							<Label name="Marital Status" htmlFor="maritalStatus" />
							<Select name="maritalStatus" value={maritalStatus} onChange={handleChange}>
								<option value="Single">Single</option>
								<option value="Married">Married</option>
								<option value="Divorced">Divorced</option>
								<option value="Widowed">Widowed</option>
							</Select>
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>

			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Employment Info</p>
					<div className="flex">
						<div className="w-1/4 px-3">
							<Label name="Hire Date" htmlFor="startDate" />
							<DateInput name="startDate" value={startDate} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="Salary" htmlFor="salary" />
							<TextInput name="salary" disabled={!currentUser.isAdmin} value={salary} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="salaryRate" htmlFor="salaryRate" />
							<Select name="salaryRate" disabled={!currentUser.isAdmin} value={salaryRate} onChange={handleChange}>
								<option disabled defaultValue value=""></option>
								<option value="/year">Per Year</option>
								<option value="/hour">Per Hour</option>
								<option value="/week">Per Week</option>
								<option value="/month">Per Month</option>
							</Select>
						</div>
						<div className="w-1/4 px-3">
							<Label name="Title" htmlFor="title" />
							<TextInput name="title" disabled={!currentUser.isAdmin} value={title} onChange={handleChange} />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Contact Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Phone Number" htmlFor="phoneNumber" />
							<NumberFormat format="(###) ###-####" name="phoneNumber" value={phoneNumber} onChange={handleChange} className="w-full text-purp-normal border-b pb-1 px-2 disabled:bg-white" />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Alt Phone Number" htmlFor="alternatePhoneNumber" />
							<NumberFormat format="(###) ###-####" name="alternatePhoneNumber" value={alternatePhoneNumber} onChange={handleChange} className="w-full text-purp-normal border-b pb-1 px-2 disabled:bg-white" />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Email" htmlFor="email" />
							<TextInput name="email" value={email} onChange={handleChange} />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/4 px-3">
							<Label name="Address 1" htmlFor="address1" />
							<TextInput name="address1" value={address1} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="Address 2" htmlFor="address2" />
							<TextInput name="address2" value={address2} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="City" htmlFor="city" />
							<TextInput name="city" value={city} onChange={handleChange} />
						</div>
						<div className="w-1/12 px-3">
							<Label name="State" htmlFor="state" />
							<TextInput name="state" value={state} onChange={handleChange} />
						</div>
						<div className="w-1/6 px-3">
							<Label name="Zip Code" htmlFor="zipCode" />
							<TextInput name="zipCode" value={zipCode} onChange={handleChange} />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<EmployeeInfoContainer>
				<div className="p-8">
					<div className="flex justify-between">
						<p className="uppercase text-purp-normal font-semibold">Emergency Contacts</p>
						<button className="bg-purp-normal text-white font-semibold text-sm px-3 py-2 rounded hover:bg-purp-dark outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={addEmergencyContact}>
							Add Contact
						</button>
					</div>
					{emergencyContacts.map((ec, i) => {
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
					})}
				</div>
			</EmployeeInfoContainer>
			{/* Save/Remove Section */}
			<div className="pb-6 px-10 flex justify-end items-center">
				<button onClick={handleUpdate} className="bg-green-500 hover:bg-green-700 rounded transition duration-200 ease-in-out focus:outline-none text-white px-3 py-2 font-semibold">
					{saving ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Save Changes'}
				</button>
			</div>
			{/* Modals */}
			{showRemoveEmployeeModal ? <RemoveEmployeeModal firstName={firstName} lastName={lastName} closeModal={handleCloseRemoveEmployeeModal} handleDelete={handleDelete} loading={loading} /> : null}
			{showRemoveContactModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none" style={{ maxHeight: '80vh' }}>
								<div className="flex items-start p-5 rounded-t bg-purp-lightest">
									<h3 className="text-2xl text-purp-normal">Remove Contact?</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition duration-300 ease transform hover:rotate-45"
										onClick={() => setShowRemoveContactModal(false)}>
										<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
									</button>
								</div>
								<div className="relative p-6 flex-auto">
									<div className="flex flex-col">
										<p className="mb-3">Are you sure you want to remove this emergency contact?</p>
										<p>This action cannot be un-done.</p>
									</div>
								</div>
								<div className="flex items-center justify-end px-5 pb-5 rounded-b">
									<button className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={handleCancel}>
										Cancel
									</button>
									<button
										type="submit"
										className="bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease"
										onClick={() => removeEmergencyContact(modalIndex)}>
										{removing ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Remove'}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<ToastContainer position="top-center" autoClose={2000} />
		</Layout>
	)
}

export default EditEmployee

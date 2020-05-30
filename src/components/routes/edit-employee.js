import React, { useState, useEffect, useContext } from 'react'
import Layout from '../Layout'
import { db, storage } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from '@mdi/react'
import { mdiLoading, mdiEyeCheck, mdiEyeMinus, mdiDelete, mdiCameraOutline } from '@mdi/js'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import EditEmployeeInfoContainer from '../EditEmployeeInfoContainer'
import { Label, TextInput, Select } from '../FormFields'
import { AuthContext } from '../../context/Auth'
import EmployeeHeader from '../EmployeeHeader'
import RemoveEmployeeModal from '../modals/RemoveEmployeeModal'

const EditEmployee = (props) => {
	const { userProfile } = useContext(AuthContext)

	// Convert the dates back to Moment objects then set loaded to true to conditionally render the date pickers
	useEffect(() => {
		setState((prevState) => ({ ...prevState, dateOfBirth: moment.unix(dateOfBirth.seconds), startDate: moment.unix(startDate.seconds), profileImage: null }))
		setLoaded(true)
	}, [])

	const data = props.location.state.data
	const [
		{ id, firstName, lastName, middleName, startDate, dateOfBirth, ssn, title, ethnicity, gender, imageUrl, profileImage, maritalStatus, phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode, salary, emergencyContacts },
		setState,
	] = useState(data)
	const [saving, setSaving] = useState(false)
	const [removing, setRemoving] = useState(false)
	const [showRemoveEmployeeModal, setShowRemoveEmployeeModal] = useState(false)
	const [showRemoveContactModal, setShowRemoveContactModal] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [showSsn, setShowSsn] = useState(false)
	const [dobFocus, setDobFocus] = useState(false)
	const [startDateFocus, setStartDateFocus] = useState(false)
	const [modalIndex, setModalIndex] = useState(null)

	// Data variable to send to the EmployeeHeader component
	const EmployeeHeaderData = { userProfile, loaded, showSsn, firstName, lastName, ssn, title, startDate, dateOfBirth, imageUrl, salary }

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
				dateOfBirth: dateOfBirth._d,
				startDate: startDate._d,
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
				emergencyContacts,
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
		setRemoving(true)
		db.collection('Employees')
			.doc(data.id)
			.delete()
			.then(function () {
				setShowRemoveEmployeeModal(false)
				props.history.push('/employees')
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

	return (
		<Layout>
			<EmployeeHeader data={EmployeeHeaderData} handleFile={handleFile} showModal={handleShowRemoveEmployeeModal} />
			<EditEmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Personal Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="First Name" htmlFor="firstName" />
							<TextInput name="firstName" disabled={!userProfile.isAdmin} value={firstName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Middle Name" htmlFor="middleName" />
							<TextInput name="middleName" disabled={!userProfile.isAdmin} value={middleName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Last Name" htmlFor="lastName" />
							<TextInput name="lastName" disabled={!userProfile.isAdmin} value={lastName} onChange={handleChange} />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="DOB" htmlFor="dob" />
							<div className="date-picker-no-border">
								{loaded ? (
									<SingleDatePicker
										date={dateOfBirth}
										onDateChange={handleDobChange}
										focused={dobFocus}
										onFocusChange={() => setDobFocus(!dobFocus)}
										numberOfMonths={1}
										isOutsideRange={() => false}
										anchorDirection="left"
										noBorder={true}
										disabled={!userProfile.isAdmin}
										id="dateOfBirth"
									/>
								) : null}
							</div>
						</div>
						<div className="w-1/5 px-3 relative">
							<Label name="SSN" htmlFor="ssn" />
							{showSsn ? <TextInput name="ssn" disabled={!userProfile.isAdmin} value={ssn} onChange={handleChange} /> : <TextInput name="ssn" disabled value="XXX-XX-XXXX" />}
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
			</EditEmployeeInfoContainer>
			<EditEmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Employment Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Hire Date" htmlFor="startDate" />
							<div className="date-picker-no-border">
								{loaded ? (
									<SingleDatePicker
										date={startDate}
										onDateChange={handleStartDateChange}
										focused={startDateFocus}
										onFocusChange={() => setStartDateFocus(!startDateFocus)}
										numberOfMonths={1}
										isOutsideRange={() => false}
										anchorDirection="left"
										noBorder={true}
										disabled={!userProfile.isAdmin}
										id="dateOfBirth"
									/>
								) : null}
							</div>
						</div>
						<div className="w-1/3 px-3">
							<Label name="Salary" htmlFor="salary" />
							<TextInput name="salary" disabled={!userProfile.isAdmin} value={salary} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Title" htmlFor="title" />
							<TextInput name="title" disabled={!userProfile.isAdmin} value={title} onChange={handleChange} />
						</div>
					</div>
				</div>
			</EditEmployeeInfoContainer>
			<EditEmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Contact Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Phone Number" htmlFor="phoneNumber" />
							<TextInput name="phoneNumber" value={phoneNumber} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Alt Phone Number" htmlFor="alternatePhoneNumber" />
							<TextInput name="alternatePhoneNumber" value={alternatePhoneNumber} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Email" htmlFor="email" />
							<TextInput name="email" value={email} onChange={handleChange} />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="Address 1" htmlFor="address1" />
							<TextInput name="address1" value={address1} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Address 2" htmlFor="address2" />
							<TextInput name="address2" value={address2} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="City" htmlFor="city" />
							<TextInput name="city" value={city} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="State" htmlFor="state" />
							<TextInput name="state" value={state} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Zip Code" htmlFor="zipCode" />
							<TextInput name="zipCode" value={zipCode} onChange={handleChange} />
						</div>
					</div>
				</div>
			</EditEmployeeInfoContainer>
			<EditEmployeeInfoContainer>
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
			</EditEmployeeInfoContainer>
			{/* Save/Remove Section */}
			<div className="pb-6 px-10 flex justify-end items-center">
				<button onClick={handleUpdate} className="bg-purp-normal text-white px-3 py-2 font-semibold">
					{saving ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Update'}
				</button>
			</div>
			{/* Modals */}
			{showRemoveEmployeeModal ? <RemoveEmployeeModal firstName={firstName} lastName={lastName} closeModal={handleCloseRemoveEmployeeModal} delete={handleDelete} /> : null}
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
			<ToastContainer position="top-center" autoClose={3000} />
		</Layout>
	)
}

export default EditEmployee

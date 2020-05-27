import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { db } from '../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from '@mdi/react'
import { mdiLoading, mdiEyeCheck, mdiEyeMinus, mdiDelete } from '@mdi/js'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import EditEmployeeInfoContainer from './EditEmployeeInfoContainer'
import Label from './EditEmployeeInfoLabel'
import { TextInput, Select } from './EditEmployeeInputFields'

const EditEmployee = (props) => {
	// Convert the dates back to Moment objects then set loaded to true to conditionally render the date pickers
	useEffect(() => {
		setState((prevState) => ({ ...prevState, dateOfBirth: moment.unix(dateOfBirth.seconds), startDate: moment.unix(startDate.seconds) }))
		setLoaded(true)
	}, [])

	const data = props.location.state.data
	const [
		{ id, firstName, lastName, middleName, startDate, dateOfBirth, ssn, title, ethnicity, gender, imageUrl, maritalStatus, phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode, salary, emergencyContacts },
		setState,
	] = useState(data)
	const [saving, setSaving] = useState(false)
	const [removing, setRemoving] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [showSsn, setShowSsn] = useState(false)
	const [dobFocus, setDobFocus] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleEcChange = (e, i) => {
		const { name, value } = e.target
		let newEc = [...emergencyContacts]
		newEc[i][name] = value
		setState((prevState) => ({ ...prevState, emergencyContacts: newEc }))
	}

	const handleCancel = () => {
		setShowModal(false)
	}

	const handleDobChange = (dateOfBirth) => {
		setState((prevState) => ({ ...prevState, dateOfBirth }))
	}

	const handleStartDateChange = (startDate) => {
		setState((prevState) => ({ ...prevState, startDate }))
	}

	const handleUpdate = (e) => {
		e.preventDefault()
		setSaving(true)
		db.collection('Employees')
			.doc(id)
			.update({
				firstName,
				lastName,
				middleName,
				dateofBirth: dateOfBirth._d,
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

	const handleDelete = () => {
		setRemoving(true)
		db.collection('Employees')
			.doc(data.id)
			.delete()
			.then(function () {
				setShowModal(false)
				props.history.push('/employees')
			})
	}

	return (
		<Layout>
			<div className="bg-white pb-6 pt-8 px-8 flex">
				<div className="w-40 mx-2">
					{imageUrl ? (
						<img src={imageUrl} alt="photo" className="rounded-full h-32 w-32 mb-3 border-purp-light border-4" />
					) : (
						<div className="rounded-full bg-purp-light h-32 w-32 mb-3 flex items-center justify-center">
							<span className="font-semibold text-2xl text-purp-normal">
								{firstName.charAt(0)}
								{lastName.charAt(0)}
							</span>
						</div>
					)}
				</div>
				<div className="w-full mx-2 flex">
					<div className="w-1/2">
						<h1 className="font-thin leading-none text-5xl text-purp-normal">
							{firstName} {lastName}
						</h1>
						<p className="text-purp-normal mt-2 font-semibold">{title}</p>
					</div>
					<div className="w-1/4">
						<p className="text-purp-normal mb-3">Hired on: {loaded ? <span className="font-semibold">{startDate ? startDate.format('MMMM DD, YYYY') : null}</span> : null}</p>
						<p className="text-purp-normal mb-3">
							SSN: <span className={`font-semibold ${showSsn ? 'tracking-widest' : null}`}>{showSsn ? ssn : 'XXX-XXX-XXXX'}</span>
							<Icon path={showSsn ? mdiEyeMinus : mdiEyeCheck} size={1} color="#414255" className="pb-1 inline ml-2 cursor-pointer" onClick={() => setShowSsn(!showSsn)} />
						</p>
						<p className="text-purp-normal mb-3">
							DOB:{' '}
							{loaded ? (
								<span className="font-semibold">
									{dateOfBirth ? dateOfBirth.format('MMMM DD, YYYY') : null} ({moment().diff(dateOfBirth, 'years')})
								</span>
							) : null}
						</p>
						<p className="text-purp-normal mb-3">
							Salary: <span className="font-semibold">${salary.toLocaleString('en')}</span>
						</p>
					</div>
					<div className="w-1/4 flex justify-end">
						<button className="h-px text-red-600 hover:text-red-800 font-bold uppercase text-sm focus:outline-none transition duration-200 ease" onClick={() => setShowModal(true)} style={{ display: saving ? 'none' : 'block' }}>
							<Icon path={mdiDelete} size={1} />
						</button>
					</div>
				</div>
			</div>
			<EditEmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Personal Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="First Name" htmlFor="firstName" />
							<TextInput name="firstName" value={firstName} placeholder="First Name" onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Middle Name" htmlFor="middleName" />
							<TextInput name="middleName" value={middleName} placeholder="Middle Name" onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Last Name" htmlFor="lastName" />
							<TextInput name="lastName" value={lastName} placeholder="Last Name" onChange={handleChange} />
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
										placeholder="Date of Birth"
										numberOfMonths={1}
										isOutsideRange={() => false}
										anchorDirection="left"
										noBorder={true}
										id="dateOfBirth"
									/>
								) : null}
							</div>
						</div>
						<div className="w-1/5 px-3">
							<Label name="SSN" htmlFor="ssn" />
							<TextInput name="ssn" value={ssn} placeholder="SSN" onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Gender" htmlFor="gender" />
							<Select name="gender" value={gender} placeholder="Gender" onChange={handleChange}>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</Select>
						</div>
						<div className="w-1/5 px-3">
							<Label name="Ethnicity" htmlFor="ethnicity" />
							<Select name="ethnicity" value={ethnicity} placeholder="Ethnicity" onChange={handleChange}>
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
							<Select name="maritalStatus" value={maritalStatus} placeholder="Marital Status" onChange={handleChange}>
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
					<p className="uppercase text-purp-normal font-semibold mb-5">Contact Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Phone Number" htmlFor="phoneNumber" />
							<TextInput name="phoneNumber" value={phoneNumber} placeholder="Phone Number" onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Alt Phone Number" htmlFor="alternatePhoneNumber" />
							<TextInput name="alternatePhoneNumber" value={alternatePhoneNumber} placeholder="Alt Phone Number" onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Email" htmlFor="email" />
							<TextInput name="email" value={email} placeholder="Email" onChange={handleChange} />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="Address 1" htmlFor="address1" />
							<TextInput name="address1" value={address1} placeholder="Address 1" onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Address 2" htmlFor="address2" />
							<TextInput name="address2" value={address2} placeholder="Address 2" onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="City" htmlFor="city" />
							<TextInput name="city" value={city} placeholder="City" onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="State" htmlFor="state" />
							<TextInput name="state" value={state} placeholder="State" onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Zip Code" htmlFor="zipCode" />
							<TextInput name="zipCode" value={zipCode} placeholder="Zip Code" onChange={handleChange} />
						</div>
					</div>
				</div>
			</EditEmployeeInfoContainer>
			<EditEmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Emergency Contacts</p>

					{emergencyContacts.map((ec, i) => {
						return (
							<div className="flex" key={i}>
								<div className="w-1/4 px-3">
									<Label name="First Name" htmlFor="firstName" />
									<TextInput name="firstName" value={ec.firstName} placeholder="First Name" onChange={(e) => handleEcChange(e, i)} />
								</div>
								<div className="w-1/4 px-3">
									<Label name="Last Name" htmlFor="lastName" />
									<TextInput name="lastName" value={ec.lastName} placeholder="Last Name" onChange={(e) => handleEcChange(e, i)} />
								</div>
								<div className="w-1/4 px-3">
									<Label name="Relationship" htmlFor="relationship" />
									<TextInput name="relationship" value={ec.relationship} placeholder="Relationship" onChange={(e) => handleEcChange(e, i)} />
								</div>
								<div className="w-1/4 px-3">
									<Label name="Phone Number" htmlFor="phoneNumber" />
									<TextInput name="phoneNumber" value={ec.phoneNumber} placeholder="Phone Number" onChange={(e) => handleEcChange(e, i)} />
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
			{/* Modal */}
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none" style={{ maxHeight: '80vh' }}>
								<div className="flex items-start p-5 rounded-t bg-purp-lightest">
									<h3 className="text-2xl text-purp-normal">Remove Employee?</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition duration-300 ease transform hover:rotate-45"
										onClick={() => setShowModal(false)}>
										<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
									</button>
								</div>
								<div className="relative p-6 flex-auto">
									<div className="flex flex-col">
										<p className="mb-3">
											Are you sure you want to remove {firstName} {lastName}?
										</p>
										<p>This action cannot be un-done.</p>
									</div>
								</div>
								<div className="flex items-center justify-end px-5 pb-5 rounded-b">
									<button className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={handleCancel}>
										Cancel
									</button>
									<button type="submit" className="bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={handleDelete}>
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

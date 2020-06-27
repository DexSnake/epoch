import React, { useState } from 'react'
import Layout from '../Layout'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { Label, TextInput, Select, DateInput, ValidationError } from '../FormFields'
import Icon from '@mdi/react'
import { mdiAccountPlus } from '@mdi/js'
import { db, functions } from '../../firebase/firebase'
import NumberFormat from 'react-number-format'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AddEmployee = (props) => {
	const initalState = {
		firstName: '',
		lastName: '',
		middleName: '',
		startDate: '',
		dateOfBirth: '',
		ssn: '',
		title: '',
		ethnicity: '',
		gender: '',
		maritalStatus: '',
		phoneNumber: '',
		alternatePhoneNumber: '',
		email: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zipCode: '',
		salary: '',
		salaryRate: '',
		ecFirstName: '',
		ecLastName: '',
		ecRelationship: '',
		ecPhoneNumber: '',
		availableHours: '',
		role: { name: 'User', accessLevel: 0 },
	}
	const [
		{
			firstName,
			lastName,
			middleName,
			startDate,
			dateOfBirth,
			ssn,
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
			ecFirstName,
			ecLastName,
			ecRelationship,
			ecPhoneNumber,
			availableHours,
			role,
		},
		setState,
	] = useState(initalState)

	const [loading, setLoading] = useState(false)
	const userPassword = `${firstName.toLowerCase().charAt(0)}${lastName.toLowerCase()}${ssn.substr(ssn.length - 4)}`
	const createUser = functions.httpsCallable('createUser')
	const setUserPermissions = functions.httpsCallable('setUserPermissions')

	// Function to handle the onChange events for the inputs
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleUserRole = (e) => {
		if (e.target.value === 'Super Admin') {
			setState((prevState) => ({ ...prevState, role: { name: 'Super Admin', accessLevel: 3 } }))
		} else if (e.target.value === 'Admin') {
			setState((prevState) => ({ ...prevState, role: { name: 'Admin', accessLevel: 2 } }))
		} else if (e.target.value === 'Supervisor') {
			setState((prevState) => ({ ...prevState, role: { name: 'Supervisor', accessLevel: 1 } }))
		} else {
			setState((prevState) => ({ ...prevState, role: { name: 'User', accessLevel: 0 } }))
		}
	}

	const handleAddEmployee = (e) => {
		e.preventDefault()
		setLoading(true)
		createUser({ email: email, password: userPassword, firstName: firstName, lastName: lastName, role: 'Employee', accessLevel: 0 })
			.then((newUser) => {
				const uid = newUser.data.uid
				setUserPermissions({ uid: uid, role: role.name, accessLevel: role.accessLevel })
					.then((res) => {
						db.collection('Employees')
							.doc(uid)
							.set({
								isActive: true,
								createdAt: new Date(),
								firstName,
								lastName,
								middleName,
								dateOfBirth,
								startDate,
								ssn,
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
								emergencyContacts: [
									{
										firstName: ecFirstName,
										lastName: ecLastName,
										relationship: ecRelationship,
										phoneNumber: ecPhoneNumber,
									},
								],
								pto: {
									availableHours: parseInt(availableHours),
									pendingHours: 0,
									usedHours: 0,
								},
							})
							.then(function () {
								props.history.push('/employees')
							})
							.catch(function (error) {
								toast.error(error.message)
							})
					})
					.catch((error) => {
						toast.error(error.message)
					})
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}

	return (
		<Layout>
			<h1 className="m-10 text-purp-normal text-3xl">
				<Icon path={mdiAccountPlus} size={2.2} className="inline mr-3 pb-1" />
				Add New Employee
			</h1>
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Personal Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="First Name" htmlFor="firstName" required />
							<TextInput name="firstName" value={firstName} onChange={handleChange} required />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Middle Name" htmlFor="middleName" />
							<TextInput name="middleName" value={middleName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Last Name" htmlFor="lastName" required />
							<TextInput name="lastName" value={lastName} onChange={handleChange} required />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="DOB" htmlFor="dateOfBirth" required />
							<DatePicker
								name="dateOfBirth"
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								className="disabled:bg-white disabled:text-purp-medium focus:outline-none border-b pb-1 font-semibold text-purp-normal"
								name="test"
								selected={dateOfBirth}
								onChange={(date) => setState((prevState) => ({ ...prevState, dateOfBirth: date }))}
							/>
						</div>
						<div className="w-1/5 px-3 relative">
							<Label name="SSN" htmlFor="ssn" required />
							<NumberFormat format="###-##-####" name="ssn" value={ssn} onChange={handleChange} className="w-full text-purp-normal focus:outline-none border-b pb-1 px-2 disabled:bg-white" required />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Gender" htmlFor="gender" />
							<Select name="gender" value={gender} onChange={handleChange}>
								<option disabled defaultValue value=""></option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</Select>
						</div>
						<div className="w-1/5 px-3">
							<Label name="Ethnicity" htmlFor="ethnicity" />
							<Select name="ethnicity" value={ethnicity} onChange={handleChange}>
								<option disabled defaultValue value=""></option>
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
								<option disabled defaultValue value=""></option>
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
					<p className="uppercase text-purp-normal font-semibold mb-5">Time Off Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Available Hours" htmlFor="availableHours" required />
							<TextInput name="availableHours" value={availableHours} onChange={handleChange} required />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Employment Info</p>
					<div className="flex">
						<div className="w-1/4 px-3">
							<Label name="Start Date" htmlFor="startDate" required />
							<DatePicker
								className="disabled:bg-white disabled:text-purp-medium focus:outline-none border-b pb-1 font-semibold text-purp-normal"
								name="startDate"
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								selected={startDate}
								onChange={(date) => setState((prevState) => ({ ...prevState, startDate: date }))}
							/>
						</div>
						<div className="w-1/4 px-3">
							<Label name="Salary" htmlFor="salary" />
							<TextInput name="salary" value={salary} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="salaryRate" htmlFor="salaryRate" />
							<Select name="salaryRate" value={salaryRate} onChange={handleChange}>
								<option disabled defaultValue value=""></option>
								<option value="/year">Per Year</option>
								<option value="/hour">Per Hour</option>
								<option value="/week">Per Week</option>
								<option value="/month">Per Month</option>
							</Select>
						</div>
						<div className="w-1/4 px-3">
							<Label name="title" htmlFor="title" required />
							<TextInput name="title" value={title} onChange={handleChange} required />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Contact Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Phone Number" htmlFor="phoneNumber" required />
							<NumberFormat format="(###) ###-####" name="phoneNumber" value={phoneNumber} onChange={handleChange} className="w-full focus:outline-none text-purp-normal border-b pb-1 px-2 disabled:bg-white" required />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Alt Phone Number" htmlFor="alternatePhoneNumber" />
							<NumberFormat format="(###) ###-####" name="alternatePhoneNumber" value={alternatePhoneNumber} onChange={handleChange} className="w-full focus:outline-none text-purp-normal border-b pb-1 px-2 disabled:bg-white" />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Email" htmlFor="email" required />
							<TextInput name="email" value={email} onChange={handleChange} required />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="Address 1" htmlFor="address1" required />
							<TextInput name="address1" value={address1} onChange={handleChange} required />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Address 2" htmlFor="address2" />
							<TextInput name="address2" value={address2} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="City" htmlFor="city" required />
							<TextInput name="city" value={city} onChange={handleChange} required />
						</div>
						<div className="w-1/5 px-3">
							<Label name="State" htmlFor="state" required />
							<TextInput name="state" value={state} onChange={handleChange} required />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Zip Code" htmlFor="zipCode" required />
							<TextInput name="zipCode" value={zipCode} onChange={handleChange} required />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<EmployeeInfoContainer>
				<div className="p-8">
					<div className="flex justify-between">
						<p className="uppercase text-purp-normal font-semibold">Emergency Contact</p>
					</div>
					<div className="flex">
						<div className="w-1/4 px-3">
							<Label name="First Name" htmlFor="ecFirstName" />
							<TextInput name="ecFirstName" value={ecFirstName} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="Last Name" htmlFor="ecLastName" />
							<TextInput name="ecLastName" value={ecLastName} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="Relationship" htmlFor="ecRelationship" />
							<TextInput name="ecRelationship" value={ecRelationship} onChange={handleChange} />
						</div>
						<div className="w-1/4 px-3">
							<Label name="Phone Number" htmlFor="ecPhoneNumber" />
							<NumberFormat format="(###) ###-####" name="ecPhoneNumber" value={ecPhoneNumber} onChange={handleChange} className="w-full focus:outline-none text-purp-normal border-b pb-1 px-2 disabled:bg-white" />
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<EmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Permissions</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="User Role" htmlFor="userRole" required />
							<Select name="userRole" value={role.name} onChange={handleUserRole}>
								<option defaultValue value="User">
									User
								</option>
								<option value="Supervisor">Supervisor</option>
								<option value="Admin">Admin</option>
								<option value="Super Admin">Super Admin</option>
							</Select>
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
			<div className="pb-6 px-10 flex justify-end items-center">
				<SubmitButtonWithLoader onClick={handleAddEmployee} text="Create Employee" loadingText="Creating Employee..." loading={loading} fullWidth={false} />
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</Layout>
	)
}

export default AddEmployee

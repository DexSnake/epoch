import React, { useState } from 'react'
import Layout from '../Layout'
import EditEmployeeInfoContainer from '../EditEmployeeInfoContainer'
import { Label, TextInput, Select } from '../FormFields'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const AddEmployee = () => {
	const [
		{ id, firstName, lastName, middleName, startDate, dateOfBirth, ssn, title, ethnicity, gender, imageUrl, profileImage, maritalStatus, phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode, salary, emergencyContacts },
		setState,
	] = useState('')
	const [dobFocus, setDobFocus] = useState(false)

	// Function to handle the onChange events for the inputs
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	// Function to handle the onChange event of the dateOfBirth input
	const handleDobChange = (dateOfBirth) => {
		setState((prevState) => ({ ...prevState, dateOfBirth }))
	}

	return (
		<Layout>
			<EditEmployeeInfoContainer>
				<div className="p-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Personal Info</p>
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="First Name" htmlFor="firstName" />
							<TextInput name="firstName" value={firstName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Middle Name" htmlFor="middleName" />
							<TextInput name="middleName" value={middleName} onChange={handleChange} />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Last Name" htmlFor="lastName" />
							<TextInput name="lastName" value={lastName} onChange={handleChange} />
						</div>
					</div>
				</div>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/5 px-3">
							<Label name="DOB" htmlFor="dob" />
							<div className="date-picker-no-border">
								<SingleDatePicker
									date={dateOfBirth}
									onDateChange={handleDobChange}
									focused={dobFocus}
									onFocusChange={() => setDobFocus(!dobFocus)}
									numberOfMonths={1}
									isOutsideRange={() => false}
									anchorDirection="left"
									noBorder={true}
									id="dateOfBirth"
								/>
							</div>
						</div>
						<div className="w-1/5 px-3 relative">
							<Label name="SSN" htmlFor="ssn" />
							<TextInput name="ssn" value={ssn} onChange={handleChange} />
						</div>
						<div className="w-1/5 px-3">
							<Label name="Gender" htmlFor="gender" />
							<Select name="gender" value={gender} onChange={handleChange}>
								<option disabled selected value></option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</Select>
						</div>
						<div className="w-1/5 px-3">
							<Label name="Ethnicity" htmlFor="ethnicity" />
							<Select name="ethnicity" value={ethnicity} onChange={handleChange}>
								<option disabled selected value></option>
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
								<option disabled selected value></option>
								<option value="Single">Single</option>
								<option value="Married">Married</option>
								<option value="Divorced">Divorced</option>
								<option value="Widowed">Widowed</option>
							</Select>
						</div>
					</div>
				</div>
			</EditEmployeeInfoContainer>
		</Layout>
	)
}

export default AddEmployee

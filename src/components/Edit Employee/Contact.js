import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { AuthContext } from '../../context/Auth'
import { TextInput, Label } from '../FormFields'
import NumberFormat from 'react-number-format'

const Contact = () => {
	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [{ phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode }, setState] = useState(employeeProfile)

	const data = { phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode }

	useEffect(() => {
		setState(employeeProfile)
	}, [employeeProfile])

	useEffect(() => {
		updateEmployeeProfile(data)
	}, [phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode])

	// Function to handle the onChange event of the dateOfBirth input
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	return (
		<React.Fragment>
			<div className="px-10 pt-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Contact Information</p>
			</div>
			<EmployeeInfoContainer>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/3 px-3">
							<Label name="Phone Number" htmlFor="phoneNumber" />
							<NumberFormat format="(###) ###-####" name="phoneNumber" value={phoneNumber} onChange={handleChange} className="w-full text-purp-normal font-semibold border-b pb-1 px-2 disabled:bg-white" />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Alt Phone Number" htmlFor="alternatePhoneNumber" />
							<NumberFormat format="(###) ###-####" name="alternatePhoneNumber" value={alternatePhoneNumber} onChange={handleChange} className="w-full text-purp-normal font-semibold border-b pb-1 px-2 disabled:bg-white" />
						</div>
						<div className="w-1/3 px-3">
							<Label name="Email" htmlFor="email" />
							<TextInput name="email" disabled={!currentUser.isAdmin} value={email} onChange={handleChange} />
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
		</React.Fragment>
	)
}

export default Contact

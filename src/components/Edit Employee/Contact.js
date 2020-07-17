import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { AuthContext } from '../../context/Auth'
import { TextInput, Label } from '../FormFields'
import NumberFormat from 'react-number-format'

const Contact = () => {
	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [{ phoneNumber, alternatePhoneNumber, email, address1, address2, city, state, zipCode }, setState] = useState(
		employeeProfile
	)

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
			<div className="max-w-6xl mx-auto">
				<div className="px-10 pt-8">
					<p className="uppercase text-purp-normal font-semibold mb-5">Contact Information</p>
				</div>
				<EmployeeInfoContainer>
					<div className="px-8 pt-8 pb-2">
						<div className="flex flex-wrap">
							<div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
								<Label name="Phone Number" htmlFor="phoneNumber" />
								<NumberFormat
									format="(###) ###-####"
									name="phoneNumber"
									value={phoneNumber}
									onChange={handleChange}
									className="w-full text-purp-normal focus:outline-none font-semibold border-b pb-1 px-2 disabled:bg-white"
								/>
							</div>
							<div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
								<Label name="Alt Phone Number" htmlFor="alternatePhoneNumber" />
								<NumberFormat
									format="(###) ###-####"
									name="alternatePhoneNumber"
									value={alternatePhoneNumber}
									onChange={handleChange}
									className="w-full text-purp-normal focus:outline-none font-semibold border-b pb-1 px-2 disabled:bg-white"
								/>
							</div>
							<div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
								<Label name="Email" htmlFor="email" />
								<TextInput
									name="email"
									disabled={!currentUser.accessLevel > 0}
									value={email || ''}
									onChange={handleChange}
								/>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5 px-3 mb-6">
								<Label name="Address 1" htmlFor="address1" />
								<TextInput name="address1" value={address1 || ''} onChange={handleChange} />
							</div>
							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5 px-3 mb-6">
								<Label name="Address 2" htmlFor="address2" />
								<TextInput name="address2" value={address2 || ''} onChange={handleChange} />
							</div>
							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5 px-3 mb-6">
								<Label name="City" htmlFor="city" />
								<TextInput name="city" value={city || ''} onChange={handleChange} />
							</div>
							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5 px-3 mb-6">
								<Label name="State" htmlFor="state" />
								<TextInput name="state" value={state || ''} onChange={handleChange} />
							</div>
							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5 px-3 mb-6">
								<Label name="Zip Code" htmlFor="zipCode" />
								<TextInput name="zipCode" value={zipCode || ''} onChange={handleChange} />
							</div>
						</div>
					</div>
				</EmployeeInfoContainer>
			</div>
		</React.Fragment>
	)
}

export default Contact

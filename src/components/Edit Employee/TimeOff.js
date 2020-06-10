import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { Label, TextInput } from '../FormFields'
import { AuthContext } from '../../context/Auth'

const TimeOff = () => {
	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [{ pto }, setState] = useState(employeeProfile)

	const data = { pto }

	useEffect(() => {
		setState(employeeProfile)
	}, [employeeProfile])

	useEffect(() => {
		updateEmployeeProfile(data)
	}, [pto])

	// Function to handle the onChange event of the dateOfBirth input
	const handlePtoChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, pto: { [name]: parseInt(value), pendingHours: pto.pendingHours, usedHours: pto.usedHours } }))
	}

	return (
		<EmployeeInfoContainer>
			<div className="p-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Time Off Info</p>
				<div className="flex">
					<div className="w-1/3 px-3">
						<Label name="Available Hours" htmlFor="availableHours" />
						<TextInput name="availableHours" disabled={!currentUser.isAdmin} value={pto ? pto.availableHours : 0} onChange={handlePtoChange} />
					</div>
					<div className="w-1/3 px-3">
						<Label name="Pending Hours" htmlFor="pendingHours" />
						<TextInput name="pendingHours" disabled value={pto ? pto.pendingHours : 0} />
					</div>
					<div className="w-1/3 px-3">
						<Label name="Hours Used" htmlFor="usedHours" />
						<TextInput name="usedHours" disabled value={pto ? pto.usedHours : 0} />
					</div>
				</div>
			</div>
		</EmployeeInfoContainer>
	)
}

export default TimeOff

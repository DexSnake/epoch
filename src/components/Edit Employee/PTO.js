import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { Label, TextInput } from '../FormFields'
import { AuthContext } from '../../context/Auth'

const PTO = () => {
	const { currentUser, employeeProfile } = useContext(AuthContext)
	const [pto, setPto] = useState(employeeProfile.pto)

	useEffect(() => {
		setPto(employeeProfile.pto)
	}, [employeeProfile])

	return (
		<EmployeeInfoContainer>
			<div className="p-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Time Off Info</p>
				<div className="flex">
					<div className="w-1/3 px-3">
						<Label name="Available Hours" htmlFor="availableHours" />
						<TextInput name="availableHours" disabled={!currentUser.isAdmin} value={pto ? pto.availableHours : 0} />
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

export default PTO

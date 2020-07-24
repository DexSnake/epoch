import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { Label, TextInput } from '../FormFields'
import { AuthContext } from '../../context/Auth'
import Icon from '@mdi/react'
import { mdiRestore } from '@mdi/js'

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
		setState((prevState) => ({
			...prevState,
			pto: { [name]: parseInt(value), pendingHours: pto.pendingHours, usedHours: pto.usedHours }
		}))
	}

	const resetPTO = () => {
		setState((prevState) => ({
			...prevState,
			pto: { availableHours: pto.availableHours, pendingHours: 0, usedHours: 0 }
		}))
	}

	return (
		<React.Fragment>
			<div className="max-w-6xl mx-auto">
				<div className="px-10 pt-8 flex justify-between">
					<p className="uppercase text-purp-normal font-semibold">Time Off</p>
					{currentUser.accessLevel > 0 && currentUser.uid !== employeeProfile.id ? (
						<button onClick={resetPTO} className="text-red-500 hover:text-red:600 font-semibold text-sm">
							<Icon path={mdiRestore} size={0.9} className="inline pb-1 mr-1" />
							Rest PTO
						</button>
					) : null}
				</div>
				<EmployeeInfoContainer>
					<div className="px-8 pt-8 pb-2">
						<div className="flex flex-wrap">
							<div className="w-full md:w-1/3 px-3 mb-6">
								<Label name="Available Hours" htmlFor="availableHours" />
								<TextInput
									name="availableHours"
									disabled={!currentUser.accessLevel > 0 || currentUser.uid === employeeProfile.id}
									value={pto ? pto.availableHours : 0}
									onChange={handlePtoChange}
								/>
							</div>
							<div className="w-full md:w-1/3 px-3 mb-6">
								<Label name="Pending Hours" htmlFor="pendingHours" />
								<TextInput name="pendingHours" disabled value={pto ? pto.pendingHours : 0} />
							</div>
							<div className="w-full md:w-1/3 px-3 mb-6">
								<Label name="Hours Used" htmlFor="usedHours" />
								<TextInput name="usedHours" disabled value={pto ? pto.usedHours : 0} />
							</div>
						</div>
					</div>
				</EmployeeInfoContainer>
			</div>
		</React.Fragment>
	)
}

export default TimeOff

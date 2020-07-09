import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { AuthContext } from '../../context/Auth'
import { Select, TextInput, Label } from '../FormFields'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Employment = () => {
	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [{ startDate, salary, salaryRate, title }, setState] = useState(employeeProfile)
	const data = { startDate, salary, salaryRate, title }

	useEffect(() => {
		setState(employeeProfile)
	}, [employeeProfile])

	useEffect(() => {
		updateEmployeeProfile(data)
	}, [startDate, salary, salaryRate, title])

	// Function to handle the onChange event of the dateOfBirth input
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	return (
		<React.Fragment>
			<div className="px-10 pt-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Employment Information</p>
			</div>
			<EmployeeInfoContainer>
				<div className="p-8">
					<div className="flex">
						<div className="w-1/4 px-3">
							<Label name="Hire Date" htmlFor="startDate" />
							<DatePicker
								className="disabled:bg-white disabled:text-purp-medium focus:outline-none border-b pb-1 font-semibold text-purp-normal"
								name="test"
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								disabled={!currentUser.accessLevel > 0}
								selected={startDate}
								onChange={(date) => setState((prevState) => ({ ...prevState, startDate: date }))}
							/>
						</div>
						<div className="w-1/4 px-3">
							<Label name="Salary" htmlFor="salary" />
							<TextInput
								name="salary"
								disabled={!currentUser.accessLevel > 0}
								value={salary || ''}
								onChange={handleChange}
							/>
						</div>
						<div className="w-1/4 px-3">
							<Label name="salaryRate" htmlFor="salaryRate" />
							<Select
								name="salaryRate"
								disabled={!currentUser.accessLevel > 0}
								value={salaryRate || ''}
								onChange={handleChange}
							>
								<option disabled defaultValue value=""></option>
								<option value="/year">Per Year</option>
								<option value="/hour">Per Hour</option>
								<option value="/week">Per Week</option>
								<option value="/month">Per Month</option>
							</Select>
						</div>
						<div className="w-1/4 px-3">
							<Label name="Title" htmlFor="title" />
							<TextInput
								name="title"
								disabled={!currentUser.accessLevel > 0}
								value={title || ''}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</EmployeeInfoContainer>
		</React.Fragment>
	)
}

export default Employment

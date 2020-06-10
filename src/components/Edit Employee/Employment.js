import React, { useContext, useState, useEffect } from 'react'
import EmployeeInfoContainer from '../EmployeeInfoContainer'
import { AuthContext } from '../../context/Auth'
import { DateInput, Select, TextInput, Label } from '../FormFields'

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
		<EmployeeInfoContainer>
			<div className="p-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Employment Info</p>
				<div className="flex">
					<div className="w-1/4 px-3">
						<Label name="Hire Date" htmlFor="startDate" />
						<DateInput name="startDate" value={startDate} onChange={handleChange} />
					</div>
					<div className="w-1/4 px-3">
						<Label name="Salary" htmlFor="salary" />
						<TextInput name="salary" disabled={!currentUser.isAdmin} value={salary} onChange={handleChange} />
					</div>
					<div className="w-1/4 px-3">
						<Label name="salaryRate" htmlFor="salaryRate" />
						<Select name="salaryRate" disabled={!currentUser.isAdmin} value={salaryRate} onChange={handleChange}>
							<option disabled defaultValue value=""></option>
							<option value="/year">Per Year</option>
							<option value="/hour">Per Hour</option>
							<option value="/week">Per Week</option>
							<option value="/month">Per Month</option>
						</Select>
					</div>
					<div className="w-1/4 px-3">
						<Label name="Title" htmlFor="title" />
						<TextInput name="title" disabled={!currentUser.isAdmin} value={title} onChange={handleChange} />
					</div>
				</div>
			</div>
		</EmployeeInfoContainer>
	)
}

export default Employment

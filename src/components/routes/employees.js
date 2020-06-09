import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import Employee from '../Employee'
import EmployeeDisabled from '../EmployeeDisabled'
import { db } from '../../firebase/firebase'

const Employees = () => {
	const [employees, setEmployees] = useState([])
	const [employeesDisabled, setEmployeesDisabled] = useState([])
	const [requests, setRequests] = useState([])

	useEffect(() => {
		db.collection('Employees')
			.where('isActive', '==', true)
			.orderBy('lastName', 'asc')
			.onSnapshot((snapshot) => {
				// Get data from Employees collection and assign it avariable
				const newEmployees = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setEmployees(newEmployees)
			})
		db.collection('Requests').onSnapshot((snapshot) => {
			// Get data from Employees collection and assign it avariable
			const newRequests = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			setRequests(newRequests)
		})
	}, [])

	return (
		<Layout>
			<div className="p-10">
				<h2 className="text-3xl text-purp-normal font-semibold pl-3 pb-4">Active Employees</h2>
				<div className="flex flex-wrap">
					<Employee employees={employees} requests={requests} />
				</div>
			</div>
			{employeesDisabled.length > 0 ? (
				<div className="p-10">
					<h2 className="text-3xl text-purp-normal font-semibold pl-3 pb-4">Inactive Employees</h2>
					<div className="flex flex-wrap">
						<EmployeeDisabled employees={employeesDisabled} requests={requests} />
					</div>
				</div>
			) : null}
		</Layout>
	)
}

export default Employees

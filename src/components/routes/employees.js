import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import Employee from '../Employee'
import EmployeeDisabled from '../EmployeeDisabled'
import { db } from '../../firebase/firebase'

const Employees = () => {
	const [employees, setEmployees] = useState([])
	const [employeesDisabled, setEmployeesDisabled] = useState([])
	const [requests, setRequests] = useState([])

	console.log(employees)

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
		db.collection('Employees')
			.where('isActive', '==', false)
			.orderBy('lastName', 'asc')
			.onSnapshot((snapshot) => {
				// Get data from Employees collection and assign it avariable
				const newEmployees = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setEmployeesDisabled(newEmployees)
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
			<div className="p-10 flex flex-wrap">
				<Employee employees={employees} requests={requests} />
			</div>
			<div className="p-10 flex flex-wrap">
				<EmployeeDisabled employees={employeesDisabled} requests={requests} />
			</div>
		</Layout>
	)
}

export default Employees

import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import Employee from '../Employee'
import EmployeeDisabled from '../EmployeeDisabled'
import { db } from '../../firebase/firebase'
import EmployeeCard from '../skeletons/EmployeeCard'

const Employees = () => {
	const [employees, setEmployees] = useState(null)
	const [employeesDisabled, setEmployeesDisabled] = useState([])
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const unsubscribe = db
			.collection('Employees')
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
		return () => {
			unsubscribe()
		}
	}, [])

	useEffect(() => {
		const unsubscribe = db.collection('Requests').onSnapshot((snapshot) => {
			// Get data from Employees collection and assign it avariable
			const newRequests = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			setRequests(newRequests)
		})
		return () => {
			unsubscribe()
		}
	})

	useEffect(() => {
		const unsubscribe = db
			.collection('Employees')
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
		return () => {
			unsubscribe()
		}
	})

	return (
		<Layout>
			<div className="p-10">
				<h2 className="text-3xl text-purp-normal font-semibold pl-3 pb-4">Active Employees</h2>
				<div className="flex flex-wrap">
					{employees ? (
						employees.map((employee) => {
							return <Employee data={employee} requests={requests} key={employee.id} />
						})
					) : (
						<>
							<EmployeeCard />
							<EmployeeCard />
							<EmployeeCard />
							<EmployeeCard />
						</>
					)}
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

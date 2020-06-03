import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import Employee from '../Employee'
import { db } from '../../firebase/firebase'

const Employees = () => {
	const [employees, setEmployees] = useState([])
	const [requests, setRequests] = useState([])

	useEffect(() => {
		db.collection('Employees')
			.orderBy('lastName', 'asc')
			.get()
			.then(function (snapshot) {
				// Get data from Employees collection and assign it avariable
				const newEmployees = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setEmployees(newEmployees)
			})
		db.collection('Requests')
			.get()
			.then((snapshot) => {
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
		</Layout>
	)
}

export default Employees

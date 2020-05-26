import React, { useState, useEffect, Component } from 'react'
import Layout from './Layout'
import Employee from './Employee'
import { db } from '../firebase/firebase'
import moment from 'moment'

const Employees = () => {
	const [employees, setEmployees] = useState([])

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
	}, [])

	return (
		<Layout>
			<div className="p-10 flex flex-wrap">
				<Employee employees={employees} />
			</div>
		</Layout>
	)
}

export default Employees

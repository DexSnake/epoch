import React, { useState, useEffect, useContext } from 'react'
import Layout from 'components/Layout/Layout'
import { AuthContext } from 'context/Auth'
import Icon from '@mdi/react'
import { mdiAccountCheck, mdiAccountCancel } from '@mdi/js'
import Employee from '../Employee'
import { db } from '../../firebase/firebase'
import EmployeeCard from '../skeletons/EmployeeCard'

const Employees = ({ history }) => {
	const { currentUser } = useContext(AuthContext)
	const [employees, setEmployees] = useState(null)
	const [inactiveEmployees, setInactiveEmployees] = useState([])
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const unsubscribe = db
			.collection('Employees')
			.orderBy('lastName', 'asc')
			.onSnapshot((snapshot) => {
				// Get data from Employees collection and assign it avariable
				const newEmployees = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}))
				setEmployees(newEmployees.filter((employee) => employee.isActive === true))
				setInactiveEmployees(newEmployees.filter((employee) => employee.isActive === false))
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
				...doc.data()
			}))
			setRequests(newRequests)
		})
		return () => {
			unsubscribe()
		}
	})

	return (
		<Layout>
			<div className="max-w-6xl mx-auto">
				<div className="m-4 sm:m-10">
					<h1 className="text-xl sm:text-3xl text-purp-normal font-semibold mb-4">
						<Icon path={mdiAccountCheck} size={2.1} className="inline pb-2 mr-1" />
						Active Employees
					</h1>
					<div className="flex flex-wrap">
						{employees ? (
							employees.length > 0 ? (
								employees
									.filter((employee) => employee.id !== currentUser.uid)
									.map((employee) => {
										return <Employee data={employee} requests={requests} key={employee.id} />
									})
							) : (
								<p className="text-purp-medium font-semibold text-center text-xl">
									No employees yet. Try{' '}
									<button
										onClick={() => history.push('/add-employee')}
										className="font-semibold text-center text-xl underline"
									>
										adding your first employee.
									</button>
								</p>
							)
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
				{inactiveEmployees.length > 0 ? (
					<div className="p-10">
						<h1 className="text-3xl text-purp-normal font-semibold mb-4">
							<Icon path={mdiAccountCancel} size={2.1} className="inline pb-2 mr-1" />
							Inactive Employees
						</h1>
						{inactiveEmployees.map((employee) => {
							return <Employee data={employee} requests={requests} inactive key={employee.id} />
						})}
					</div>
				) : null}
			</div>
		</Layout>
	)
}

export default Employees

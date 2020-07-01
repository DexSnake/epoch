import React, { useEffect, useContext } from 'react'
import { db } from '../../firebase/firebase'
import Layout from '../Layout'
import NewEmployeeHeader from '../NewEmployeeHeader'
import EditEmployeeNav from '../Edit Employee/EditEmployeeNav'
import { AuthContext } from '../../context/Auth'

const NewEditEmployee = (props) => {
	const data = props.location.state
	const { setProfile, employeeProfile } = useContext(AuthContext)

	useEffect(() => {
		const unsubscribe = db
			.collection('Employees')
			.doc(data.id)
			.onSnapshot((doc) => {
				const profile = {
					id: doc.id,
					...doc.data(),
					startDate: doc.data().startDate.toDate(),
					dateOfBirth: doc.data().dateOfBirth.toDate(),
				}
				setProfile(profile)
			})
		return () => {
			unsubscribe()
		}
	}, [data.id])
	return (
		<Layout>
			<NewEmployeeHeader data={employeeProfile} />
			<EditEmployeeNav />
		</Layout>
	)
}

export default NewEditEmployee

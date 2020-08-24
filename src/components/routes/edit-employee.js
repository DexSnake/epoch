import React, { useEffect, useContext } from 'react'
import { db } from '../../firebase/firebase'
import Layout from 'components/Layout/Layout'
import EmployeeHeader from 'components/Edit Employee/EmployeeHeader'
import EditEmployeeNav from 'components/Edit Employee/EditEmployeeNav'
import { AuthContext } from 'context/Auth'

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
					dateOfBirth: doc.data().dateOfBirth.toDate()
				}
				setProfile(profile)
			})
		return () => {
			unsubscribe()
		}
	}, [data.id, setProfile])
	return (
		<Layout>
			<EmployeeHeader data={employeeProfile} />
			<EditEmployeeNav id={employeeProfile.id} />
		</Layout>
	)
}

export default NewEditEmployee

import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import Layout from '../Layout'
import NewEmployeeHeader from '../NewEmployeeHeader'

const NewEditEmployee = (props) => {
	const data = props.location.state

	const [employeeProfile, setEmployeeProfile] = useState({})

	console.log(employeeProfile)

	useEffect(() => {
		db.collection('Employees')
			.doc(data.id)
			.onSnapshot((doc) => {
				const profile = {
					id: doc.id,
					...doc.data(),
				}
				setEmployeeProfile(profile)
			})
	}, [])
	return (
		<Layout>
			<NewEmployeeHeader data={employeeProfile} />
		</Layout>
	)
}

export default NewEditEmployee

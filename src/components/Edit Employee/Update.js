import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import { db } from '../../firebase/firebase'

const Update = () => {
	const { employeeProfile } = useContext(AuthContext)

	const handleUpdate = () => {
		db.collection('Employees')
			.doc(employeeProfile.id)
			.update(employeeProfile)
			.then(function () {
				console.log('success')
			})
			.catch(function (error) {
				alert(error)
			})
	}

	return (
		<div className="flex justify-end mx-10 mt-5">
			<button className="bg-purp-normal text-white px-3 py-2 rounded" onClick={handleUpdate}>
				Save Profile
			</button>
		</div>
	)
}

export default Update

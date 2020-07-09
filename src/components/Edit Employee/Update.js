import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/Auth'
import { db } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'

const Update = () => {
	const { employeeProfile } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	const handleUpdate = () => {
		setLoading(true)
		db.collection('Employees')
			.doc(employeeProfile.id)
			.update(employeeProfile)
			.then(function () {
				toast.success('Profile Saved!')
				setLoading(false)
			})
			.catch(function (error) {
				toast.error(error.message)
			})
	}

	return (
		<React.Fragment>
			<SubmitButtonWithLoader
				text="Update Profile"
				loadingText="Updating..."
				loading={loading}
				onClick={handleUpdate}
			/>
			<ToastContainer position="top-center" autoClose={2000} />
		</React.Fragment>
	)
}

export default Update

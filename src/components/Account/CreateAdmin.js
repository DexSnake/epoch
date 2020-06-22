import React, { useState, useEffect } from 'react'
import { functions } from '../../firebase/firebase'
import { Label, TextInput, EmailInput, Select } from '../FormFields'
import generatePassword from 'password-generator'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateAdmin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState(generatePassword())
	const [displayName, setDisplayName] = useState('')
	const [role, setRole] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)
	const addAdminRole = functions.httpsCallable('addAdminRole')
	const sendAdminEmail = functions.httpsCallable('sendAdminEmail')

	const makeAdmin = (e) => {
		e.preventDefault()
		setLoading(true)
		addAdminRole({ email, password, displayName, role: role.name, accessLevel: role.accessLevel })
			.then(() => {
				sendAdminEmail({ email, password })
					.then(() => {
						setLoading(false)
						toast.success('Invitation Sent!')
						setEmail('')
						setDisplayName('')
						setRole('')
						setPassword(generatePassword())
					})
					.catch((error) => {
						setLoading(false)
						setErrorMsg(error.message)
					})
			})
			.catch((error) => {
				setLoading(false)
				setErrorMsg(error.message)
			})
	}
	return (
		<div>
			<div className="w-full bg-white p-6 rounded shadow">
				<p className="text-purp-normal font-semibold mb-4">Invite a User</p>
				<form onSubmit={makeAdmin}>
					<Label name="Name" htmlFor="name" />
					<TextInput name="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mb-4" />
					<Label name="email" htmlFor="email" />
					<EmailInput name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
					<Label name="Role" htmlFor="role" />
					<Select
						onChange={(e) => {
							if (e.target.value === 'Super Admin') {
								setRole({ name: 'Super Admin', accessLevel: 3 })
							} else if (e.target.value === 'Admin') {
								setRole({ name: 'Admin', accessLevel: 2 })
							} else {
								setRole({ name: 'Supervisor', accessLevel: 1 })
							}
						}}>
						<option defaultValue value=""></option>
						<option value="Super Admin">Super Admin</option>
						<option value="Admin">Admin</option>
						<option value="Supervisor">Manager</option>
					</Select>
					<SubmitButtonWithLoader text="Send Invite" loadingText="Sending..." loading={loading} className="mt-6" />
				</form>
				<p className="text-red-500">{errorMsg}</p>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</div>
	)
}

export default CreateAdmin

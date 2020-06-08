import React, { useState, useEffect } from 'react'
import { functions } from '../../firebase/firebase'
import { Label, TextInput, EmailInput } from '../FormFields'
import generatePassword from 'password-generator'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateAdmin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState(generatePassword())
	const [displayName, setDisplayName] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)
	const addAdminRole = functions.httpsCallable('addAdminRole')
	const sendAdminEmail = functions.httpsCallable('sendAdminEmail')

	const makeAdmin = (e) => {
		e.preventDefault()
		setLoading(true)
		addAdminRole({ email, password, displayName })
			.then(() => {
				sendAdminEmail({ email, password })
			})
			.then(() => {
				setLoading(false)
				toast.success('Request Updated!')
				setEmail('')
				setDisplayName('')
				setPassword(generatePassword())
			})
			.catch((err) => {
				setLoading(false)
				setErrorMsg(err)
			})
	}

	return (
		<div>
			<div className="w-full bg-white p-6 rounded shadow">
				<p className="text-purp-normal font-semibold mb-4">Create an Admin</p>
				<form onSubmit={makeAdmin}>
					<Label name="Name" htmlFor="name" />
					<TextInput name="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mb-4" />
					<Label name="email" htmlFor="email" />
					<EmailInput name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
					<button type="submit" className="bg-purp-normal hover:bg-purp-dark rounded text-sm text-white px-4 py-2 font-semibold">
						{loading ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Create Admin'}
					</button>
				</form>
				<p className="text-red-500">{errorMsg}</p>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</div>
	)
}

export default CreateAdmin

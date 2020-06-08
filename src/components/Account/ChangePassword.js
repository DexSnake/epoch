import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase/firebase'
import { Label, PasswordInput } from '../FormFields'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

const ChangePassword = () => {
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [passwordVerified, setPasswordVerified] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	// If passwordVerified is true, get the current user and change the passowrd, then reset all the state and display success message
	const handleChangePassword = (e) => {
		e.preventDefault()
		if (passwordVerified) {
			setLoading(true)
			auth.currentUser
				.updatePassword(passwordVerified)
				.then(function () {
					setPassword1('')
					setPassword2('')
					setPasswordVerified('')
					toast.success('Password Changed!')
					setLoading(false)
				})
				.catch(function (error) {
					setErrorMsg(error.message)
				})
		} else {
			setErrorMsg('Passwords do not match')
		}
	}

	// Everytime password1 and password2 are changed, check to see if they match, if they do set passwordVerrified
	useEffect(() => {
		if (password1 === password2) {
			setPasswordVerified(password2)
			setErrorMsg('')
		} else {
			setPasswordVerified('')
		}
	}, [password1, password2])

	return (
		<div>
			<div className="w-full bg-white p-6 rounded shadow">
				<p className="text-purp-normal font-semibold mb-4">Change Your Password</p>
				<form onSubmit={handleChangePassword}>
					<Label name="New Password" htmlFor="password1" />
					<PasswordInput name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} className="mb-4" />
					<Label name="Verifiy Password" htmlFor="password2" />
					<PasswordInput name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} className="mb-4" />
					<button type="submit" className="bg-purp-normal hover:bg-purp-dark rounded text-sm text-white px-4 py-2 font-semibold disabled:opacity-50">
						{loading ? <Icon path={mdiLoading} size={1} spin={(true, 1)} /> : 'Change Password'}
					</button>
				</form>
				<p className="text-red-600">{errorMsg}</p>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</div>
	)
}

export default ChangePassword

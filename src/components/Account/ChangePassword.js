import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase/firebase'
import { Label, PasswordInput } from '../FormFields'

const ChangePassword = () => {
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [passwordVerified, setPasswordVerified] = useState('')
	const [successMsg, setSuccessMsg] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	// If passwordVerified is true, get the current user and change the passowrd, then reset all the state and display success message
	const handleChangePassword = (e) => {
		e.preventDefault()
		if (passwordVerified) {
			auth.currentUser
				.updatePassword(passwordVerified)
				.then(function () {
					setPassword1('')
					setPassword2('')
					setPasswordVerified('')
					setSuccessMsg('Password Changed Successfully!')
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
			<div className="w-full bg-white p-6">
				<p className="text-purp-normal font-semibold mb-4">Change Password</p>
				<form onSubmit={handleChangePassword}>
					<Label name="New Password" htmlFor="password1" />
					<PasswordInput name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} className="mb-4" />
					<Label name="Verifiy Password" htmlFor="password2" />
					<PasswordInput name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} className="mb-4" />
					<button type="submit" className="bg-purp-brightest hover:bg-purp-bright text-white px-3 py-2 font-semibold">
						Change Password
					</button>
				</form>
				<p className="text-red-600">{errorMsg}</p>
				<p className="text-green-600">{successMsg}</p>
			</div>
		</div>
	)
}

export default ChangePassword

import React, { useContext, useState, useEffect } from 'react'
import Layout from './Layout'
import { AuthContext } from '../context/Auth'
import { auth } from '../firebase/firebase'

const Account = () => {
	const { userProfile } = useContext(AuthContext)
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [passwordVerified, setPasswordVerified] = useState('')
	const [successMsg, setSuccessMsg] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

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

	useEffect(() => {
		if (password1 === password2) {
			setPasswordVerified(password2)
			setErrorMsg('')
		} else {
			setPasswordVerified('')
		}
	}, [password1, password2])

	return (
		<Layout>
			<h1>{userProfile.firstName}'s Profile</h1>
			<p>Change Password</p>
			<form onSubmit={handleChangePassword}>
				<label htmlFor="password1" className="block">
					new password
				</label>
				<input type="password" name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} />
				<label htmlFor="password2" className="block">
					verify password
				</label>
				<input type="password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
				<button type="submit" className="bg-purp-normal text-white block">
					Change
				</button>
			</form>
			<p className="text-red-600">{errorMsg}</p>
			<p className="text-green-600">{successMsg}</p>
		</Layout>
	)
}

export default Account

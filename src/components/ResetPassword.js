import React, { useContext, useState } from 'react'
import { auth } from '../firebase/firebase'
import { Redirect } from 'react-router'
import { AuthContext } from '../context/Auth'

const ResetPassword = () => {
	const { currentUser } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [msg, setMsg] = useState('')

	if (currentUser) {
		return <Redirect to="/dashboard" />
	}

	const handlePasswordReset = (e) => {
		e.preventDefault()
		auth
			.sendPasswordResetEmail(email)
			.then(() => {
				setMsg('Email Sent')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<div className="mx-auto bg-purp-dark py-3 px-6 flex justify-between">
					<p className="text-white font-bold">KSTG PTO Tracker</p>
				</div>
			</header>
			<main className="flex flex-grow items-center justify-center bg-purp-lightest">
				<div className="bg-white p-8 shadow-lg">
					<h1 className="text-purp-normal text-2xl font-bold">Password Reset</h1>
					<form className="pt-4" onSubmit={handlePasswordReset}>
						<label htmlFor="email" className="block text-purp-normal">
							email
						</label>
						<input type="text" name="email" onChange={(e) => setEmail(e.target.value)} className="border border-purp-light p-2 mb-5" />
						<button type="submit" className="bg-purp-brightest hover:bg-purp-bright text-white block w-full px-8 py-2 font-semibold">
							Reset Password
						</button>
					</form>
					<p className="text-green-600">{msg}</p>
				</div>
			</main>
		</div>
	)
}

export default ResetPassword

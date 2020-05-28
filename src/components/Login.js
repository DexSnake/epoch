import React, { useContext, useCallback, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { AuthContext } from '../context/Auth'

const Login = ({ history }) => {
	const [errorMsg, setErrorMsg] = useState('')

	const handleLogin = useCallback(
		async (e) => {
			e.preventDefault()
			const { email, password } = e.target
			try {
				await auth.signInWithEmailAndPassword(email.value, password.value)
				history.push('/dashboard')
			} catch (error) {
				if (error.code === 'auth/wrong-password') {
					setErrorMsg('Incorrect email or password')
				} else {
					setErrorMsg(error.message)
				}
			}
		},
		[history]
	)

	const { currentUser } = useContext(AuthContext)

	if (currentUser) {
		return <Redirect to="/dashboard" />
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
					<h1 className="text-purp-normal text-2xl font-bold">Login</h1>
					<form className="pt-4" onSubmit={handleLogin}>
						<label htmlFor="email" className="block text-purp-normal">
							email
						</label>
						<input type="text" name="email" className="border border-purp-light p-2 mb-5" />
						<label htmlFor="password" className="block text-purp-normal">
							password
						</label>
						<input type="password" name="password" className="border border-purp-light p-2 mb-5" />
						<button type="submit" className="bg-purp-brightest hover:bg-purp-bright text-white block w-full px-8 py-2 font-semibold">
							Sign In
						</button>
					</form>
					<Link to="/reset-password">
						<small>Forgot Password?</small>
					</Link>
					<p className="text-red-600">{errorMsg}</p>
				</div>
			</main>
		</div>
	)
}

export default withRouter(Login)

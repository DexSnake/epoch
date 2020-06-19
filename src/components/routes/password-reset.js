import React, { useContext, useState } from 'react'
import { auth } from '../../firebase/firebase'
import { Redirect } from 'react-router'
import { AuthContext } from '../../context/Auth'
import { Label, EmailInput } from '../FormFields'
import PasswordResetImage from '../../images/password-reset.svg'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'
import { Link } from 'react-router-dom'

const PasswordReset = () => {
	const { currentUser } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [sent, setSent] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	if (currentUser) {
		return <Redirect to="/" />
	}

	const handlePasswordReset = (e) => {
		e.preventDefault()
		setLoading(true)
		auth
			.sendPasswordResetEmail(email)
			.then(() => {
				setLoading(false)
				setSent(true)
			})
			.catch((error) => {
				setLoading(false)
				if (error.code === 'auth/invalid-email') {
					setErrorMsg('Please enter a valid email address')
				} else {
					setErrorMsg(error.message)
				}
			})
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<div className="mx-auto bg-purp-dark py-3 px-6 flex justify-between">
					<p className="text-white font-bold">KSTG PTO Tracker</p>
				</div>
			</header>
			<main className="flex flex-grow items-center bg-purp-lightest flex-col">
				<h1 className="text-purp-normal text-3xl mt-32 mb-6 font-semibold">Reset Your Password</h1>
				<div className="bg-white p-8 rounded shadow-lg max-w-sm">
					{!sent ? (
						<>
							<p className="text-purp-normal">To reset your password, enter the email address you use to sign in.</p>
							<form className="pt-4" onSubmit={handlePasswordReset}>
								<Label name="Email" htmlFor="email" />
								<EmailInput name="email" className="mb-4" onChange={(e) => setEmail(e.target.value)} />
								<SubmitButtonWithLoader text="Get Reset Link" loadingText="Checking..." loading={loading} />
								<p className="text-red-500">{errorMsg}</p>
							</form>
						</>
					) : (
						<>
							<img src={PasswordResetImage} alt="password reset email sent" />
							<p className="text-purp-normal pt-4">Check your {email} inbox for instructions on how to reset your password.</p>
						</>
					)}
				</div>
				<Link to="/login" className="text-center mt-3 underline font-semibold text-purp-normal">
					Go back to login screen
				</Link>
			</main>
		</div>
	)
}

export default PasswordReset

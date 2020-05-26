import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<div className="mx-auto bg-purp-dark py-3 px-6 flex justify-between">
					<p className="text-white font-bold">KSTG PTO Tracker</p>
					<Link to="/dashboard">
						<p className="text-purp-light hover:text-white">Dashboard</p>
					</Link>
				</div>
			</header>
			<main className="flex flex-grow items-center justify-center bg-purp-lightest">
				<div className="bg-white p-8 shadow-lg">
					<h1 className="text-purp-normal text-2xl font-bold">Login</h1>
					<form className="pt-4">
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
				</div>
			</main>
		</div>
	)
}

export default Login

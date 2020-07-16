import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from 'images/epoch-logo.svg'
import { AuthContext } from 'context/Auth'

const Header = ({ onClick }) => {
	const { currentUser } = useContext(AuthContext)

	const matches = currentUser.displayName.match(/\b(\w)/g)
	const initials = matches.join('')

	return (
		<header>
			<div className="mx-auto bg-purp-dark py-3 px-6 flex items-center justify-between fixed z-20 w-full">
				<Link to="/" className="focus:outline-none">
					<img src={logo} className="h-8" alt="epoch logo" />
				</Link>
				<div className="flex">
					<div>
						<button onClick={onClick} className="flex items-center focus:outline-none">
							<p className="hidden sm:block text-purp-light hover:text-white text-lg mr-3">
								{currentUser.displayName}
							</p>
							{currentUser.photoURL ? (
								<img src={currentUser.photoURL} alt="user profile" className="h-8 w-8 rounded-full" />
							) : (
								<span className="h-8 w-8 rounded-full bg-purp-medium flex justify-center items-center text-xs text-purp-normal">
									{initials}
								</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header

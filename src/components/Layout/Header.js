import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from 'images/epoch-logo.svg'
import { AuthContext } from 'context/Auth'
import AccountNav from './AccountNav/AccountNav'

const Header = () => {
	const { currentUser, userStatus } = useContext(AuthContext)
	const [showProfileMenu, setShowProfileMenu] = useState(false)

	const matches = currentUser.displayName.match(/\b(\w)/g)
	const initials = matches.join('')

	let status
	if (userStatus === 'Clocked In') status = 'green'
	else if (userStatus === 'On Lunch') status = 'yellow'
	else status = 'red'

	return (
		<header>
			<div className="mx-auto bg-purp-dark py-3 px-6 flex items-center justify-between fixed z-20 w-full">
				<Link to="/" className="focus:outline-none">
					<img src={logo} className="h-8" alt="epoch logo" />
				</Link>
				<div className="flex relative">
					<div className="relative">
						<button
							onClick={() => setShowProfileMenu(!showProfileMenu)}
							className="flex items-center focus:outline-none"
						>
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
						<div
							className={`h-3 w-3 bg-${status}-500 rounded-full absolute bottom-0 right-neg-4 border border-purp-dark`}
						></div>
					</div>
					<AccountNav showProfileMenu={showProfileMenu} />
				</div>
			</div>
		</header>
	)
}

export default Header

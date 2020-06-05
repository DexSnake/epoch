import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import { auth } from '../firebase/firebase'
import UserNav from './UserNav'
import AdminNav from './AdminNav'

const Layout = (props) => {
	const { currentUser, userProfile } = useContext(AuthContext)
	const [showProfileMenu, setShowProfileMenu] = useState(false)

	const matches = currentUser.displayName.match(/\b(\w)/g)
	const initials = matches.join('')

	return (
		<React.Fragment>
			<div className="flex flex-col min-h-screen">
				<header>
					<div className="mx-auto bg-purp-dark py-3 px-6 flex justify-between">
						<Link to="/dashboard">
							<p className="text-white font-bold">KSTG PTO Tracker</p>
						</Link>
						<div className="flex">
							<div>
								<button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex">
									<p className="text-purp-light hover:text-white pl-3">{currentUser.displayName}</p>
									{currentUser.photoURL ? (
										<img src={currentUser.photoURL} alt="user profile image" className="h-6 w-6 rounded-full ml-2" />
									) : (
										<span className="h-6 w-6 rounded-full ml-2 bg-purp-medium flex justify-center items-center text-xs text-purp-normal">{initials}</span>
									)}
								</button>
							</div>
						</div>
					</div>
				</header>
				<main className="flex flex-grow">
					<div className="bg-purp-normal py-10 px-4" style={{ minWidth: 260 }}>
						{currentUser.isAdmin ? <AdminNav /> : <UserNav />}
					</div>
					<div className="bg-purp-lightest flex-grow relative">
						<div className="absolute bg-purp-normal right-20 top-0 py-2 px-4" style={{ display: showProfileMenu ? 'block' : 'none' }}>
							<ul>
								<Link to="/account">
									<li className="text-purp-light hover:text-white">Account</li>
								</Link>
								<button className="text-purp-light hover:text-white" onClick={() => auth.signOut()}>
									<li>Sign Out</li>
								</button>
							</ul>
						</div>
						{props.children}
					</div>
				</main>
			</div>
		</React.Fragment>
	)
}

export default Layout

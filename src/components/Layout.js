import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import { auth } from '../firebase/firebase'
import UserNav from './UserNav'
import AdminNav from './AdminNav'

const Layout = (props) => {
	const { currentUser, userProfile } = useContext(AuthContext)
	const [showProfileMenu, setShowProfileMenu] = useState(false)

	return (
		<React.Fragment>
			<div className="flex flex-col min-h-screen">
				<header>
					<div className="mx-auto bg-purp-dark py-3 px-6 flex justify-between">
						<Link to="/dashboard">
							<p className="text-white font-bold">KSTG PTO Tracker</p>
						</Link>
						<div className="flex">
							{currentUser ? (
								<div>
									<button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex">
										<p className="text-purp-light hover:text-white pl-3">{userProfile.firstName}</p>
										<img src={userProfile.imageUrl} alt={userProfile.firstName} className="h-6 w-6 rounded-full ml-2" />
									</button>
								</div>
							) : null}
						</div>
					</div>
				</header>
				<main className="flex flex-grow">
					<div className="bg-purp-normal w-64 py-10 px-4">{currentUser.isAdmin ? <AdminNav /> : <UserNav />}</div>
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

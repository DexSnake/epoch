import React, { useContext, useState } from 'react'
import { AuthContext } from 'context/Auth'
import UserNav from 'components/Layout/SideNav/UserNav'
import AdminNav from 'components/Layout/SideNav/AdminNav'
import AccountNav from './AccountNav/AccountNav'
import Header from './Header'
import SupervisorNav from './SideNav/SupervisorNav'

const Layout = (props) => {
	const { currentUser } = useContext(AuthContext)
	const [showProfileMenu, setShowProfileMenu] = useState(false)

	return (
		<React.Fragment>
			<div className="flex flex-col min-h-screen">
				<Header onClick={() => setShowProfileMenu(!showProfileMenu)} />
				<main className="flex flex-grow flex-col-reverse md:flex-row">
					<div className="bg-purp-normal py-2 px-2 md:px-0 md:py-20 min-w-side-bar w-full md:h-full fixed z-10 bottom-0 md:w-auto md:inset-auto">
						{currentUser.accessLevel === 0 && <UserNav />}
						{currentUser.accessLevel === 2 && <SupervisorNav />}
						{currentUser.accessLevel > 2 && <AdminNav />}
					</div>
					<div className="bg-purp-lightest flex-grow relative mt-top-bar ml-0 md:ml-side-bar pb-20 md:pb-0">
						<AccountNav showProfileMenu={showProfileMenu} />
						{props.children}
					</div>
				</main>
			</div>
		</React.Fragment>
	)
}

export default Layout

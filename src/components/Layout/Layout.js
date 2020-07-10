import React, { useContext, useState } from 'react'
import { AuthContext } from 'context/Auth'
import UserNav from 'components/Layout/SideNav/UserNav'
import AdminNav from 'components/Layout/SideNav/AdminNav'
import AccountNav from './AccountNav/AccountNav'
import Header from './Header'

const Layout = (props) => {
	const { currentUser } = useContext(AuthContext)
	const [showProfileMenu, setShowProfileMenu] = useState(false)

	return (
		<React.Fragment>
			<div className="flex flex-col min-h-screen">
				<Header onClick={() => setShowProfileMenu(!showProfileMenu)} />
				<main className="flex flex-grow flex-col-reverse md:flex-row">
					<div className="bg-purp-normal py-10 min-w-side-bar">
						{currentUser.accessLevel > 0 ? <AdminNav /> : <UserNav />}
					</div>
					<div className="bg-purp-lightest flex-grow relative">
						<AccountNav showProfileMenu={showProfileMenu} />
						{props.children}
					</div>
				</main>
			</div>
		</React.Fragment>
	)
}

export default Layout

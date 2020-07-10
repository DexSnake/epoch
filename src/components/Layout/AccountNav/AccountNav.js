import React, { useContext } from 'react'
import { mdiAccount, mdiAccountMultiple, mdiLogout } from '@mdi/js'
import { auth } from '../../../firebase/firebase'
import { AuthContext } from 'context/Auth'
import AccountNavLink from './AccountNavLink'
import AccountNavButton from './AccountNavButton'

const AccountNav = ({ showProfileMenu }) => {
	const { currentUser } = useContext(AuthContext)

	const signOut = () => {
		auth.signOut()
	}

	return (
		<div
			className={`absolute bg-purp-normal right-20 top-0 w-40 rounded-b transition-transform duration-200 ease origin-top transform z-10 ${
				showProfileMenu ? 'scale-y-100' : 'scale-y-0'
			}`}
		>
			<ul className="first:mt-2 last:mb-2">
				<AccountNavLink linkTo="account" icon={mdiAccount} text="Account" />
				{currentUser.accessLevel > 0 ? (
					<AccountNavLink linkTo="users" icon={mdiAccountMultiple} text="Users" />
				) : null}
				<AccountNavButton onClick={signOut} icon={mdiLogout} text="Logout" />
			</ul>
		</div>
	)
}

export default AccountNav

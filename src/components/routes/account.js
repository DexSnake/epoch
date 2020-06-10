import React, { useContext } from 'react'
import Layout from '../Layout'

import ChangePassword from '../Account/ChangePassword'
import CreateAdmin from '../Account/CreateAdmin'
import ChangeProfileImage from '../Account/ChangeProfileImage'
import { AuthContext } from '../../context/Auth'

const Account = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<Layout>
			<div className="flex flex-wrap m-10">
				<div className="w-1/2 px-3">
					<ChangeProfileImage />
				</div>
			</div>
			<div className="flex flex-wrap m-10">
				<div className="w-1/4 px-3">
					<ChangePassword />
				</div>
				{currentUser.isAdmin ? (
					<div className="w-1/4 px-3">
						<CreateAdmin />
					</div>
				) : null}
			</div>
		</Layout>
	)
}

export default Account

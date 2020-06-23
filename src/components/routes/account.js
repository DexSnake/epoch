import React, { useContext, useState, useEffect } from 'react'
import Layout from '../Layout'
import ChangePassword from '../Account/ChangePassword'
import CreateAdmin from '../Account/CreateAdmin'
import ChangeProfileImage from '../Account/ChangeProfileImage'
import { AuthContext } from '../../context/Auth'

const Account = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<Layout>
			<div className="flex max-w-2xl flex-wrap m-10">
				<div className="w-full py-2">
					<ChangeProfileImage />
				</div>

				<div className="w-full py-2">
					<ChangePassword />
				</div>
				{currentUser.accessLevel >= 2 ? (
					<div className="w-full py-2">
						<CreateAdmin />
					</div>
				) : null}
			</div>
		</Layout>
	)
}

export default Account

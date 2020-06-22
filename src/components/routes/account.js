import React, { useContext, useState, useEffect } from 'react'
import Layout from '../Layout'
import ChangePassword from '../Account/ChangePassword'
import CreateAdmin from '../Account/CreateAdmin'
import ChangeProfileImage from '../Account/ChangeProfileImage'
import { AuthContext } from '../../context/Auth'
import Users from '../Account/Users'

const Account = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<Layout>
			<div className="flex flex-wrap m-10">
				<div className="w-1/2 px-3">
					<ChangeProfileImage />
				</div>
				{currentUser.accessLevel >= 3 ? (
					<div className="w-1/2 px-3">
						<Users currentUser={currentUser} />
					</div>
				) : null}
			</div>
			<div className="flex flex-wrap m-10">
				<div className="w-1/4 px-3">
					<ChangePassword />
				</div>
				{currentUser.accessLevel >= 2 ? (
					<div className="w-1/4 px-3">
						<CreateAdmin />
					</div>
				) : null}
			</div>
		</Layout>
	)
}

export default Account

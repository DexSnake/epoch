import React, { useContext } from 'react'
import Layout from 'components/Layout/Layout'
import ChangePassword from '../Account/ChangePassword'
import CreateAdmin from '../Account/CreateAdmin'
import ChangeProfileImage from '../Account/ChangeProfileImage'
import { AuthContext } from '../../context/Auth'

const Account = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<Layout>
			<div className="max-w-3xl mx-auto">
				<div className="m-4 sm:m-10">
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
			</div>
		</Layout>
	)
}

export default Account

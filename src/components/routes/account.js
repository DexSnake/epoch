import React from 'react'
import Layout from '../Layout'

import ChangePassword from '../Account/ChangePassword'
import CreateAdmin from '../Account/CreateAdmin'
import ChangeProfileImage from '../Account/ChangeProfileImage'

const Account = () => {
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
				<div className="w-1/4 px-3">
					<CreateAdmin />
				</div>
			</div>
		</Layout>
	)
}

export default Account

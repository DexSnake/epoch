import React, { useState } from 'react'
import Layout from '../Layout'
import EditUserDetails from '../EditUserDetails'

const EditUser = ({ location }) => {
	const [user] = useState(location.state.user)
	return (
		<Layout>
			<div className="flex max-w-2xl flex-wrap m-10">
				<div className="w-full py-2">
					<EditUserDetails user={user} />
				</div>
			</div>
		</Layout>
	)
}

export default EditUser

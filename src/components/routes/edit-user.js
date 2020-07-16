import React, { useState } from 'react'
import Layout from 'components/Layout/Layout'
import EditUserDetails from '../EditUserDetails'

const EditUser = ({ location }) => {
	const [user] = useState(location.state.user)
	return (
		<Layout>
			<div className="max-w-2xl mx-auto">
				<div className="m-10">
					<EditUserDetails user={user} />
				</div>
			</div>
		</Layout>
	)
}

export default EditUser

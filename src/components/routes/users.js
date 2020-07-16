import React, { useContext } from 'react'
import Layout from 'components/Layout/Layout'
import { AuthContext } from '../../context/Auth'
import UserList from '../UserList'

const Users = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<Layout>
			<div className="max-w-6xl mx-auto">
				<div className="m-4 sm:m-10">
					<UserList currentUser={currentUser} />
				</div>
			</div>
		</Layout>
	)
}

export default Users

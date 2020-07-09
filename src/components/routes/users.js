import React, { useContext } from 'react'
import Layout from 'components/Layout/Layout'
import { AuthContext } from '../../context/Auth'
import UserList from '../UserList'

const Users = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<Layout>
			<div className="my-10 max-w-6xl mx-auto">
				<UserList currentUser={currentUser} />
			</div>
		</Layout>
	)
}

export default Users

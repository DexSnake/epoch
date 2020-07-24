import React, { useContext } from 'react'
import Layout from 'components/Layout/Layout'
import { AuthContext } from '../../context/Auth'
import AdminDashboard from '../AdminDashboard'
import UserDashboard from '../UserDashboard'
import SupervisorDashboard from 'components/SupervisorDashboard'

const Dashboard = () => {
	const { userProfile, currentUser } = useContext(AuthContext)
	return (
		<Layout>
			{currentUser.accessLevel === 0 && <UserDashboard userProfile={userProfile} />}
			{currentUser.accessLevel === 1 && <SupervisorDashboard userProfile={userProfile} />}
			{currentUser.accessLevel >= 2 && <AdminDashboard userProfile={userProfile} />}
		</Layout>
	)
}

export default Dashboard

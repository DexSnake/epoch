import React, { useContext } from 'react'
import Layout from '../Layout'
import { AuthContext } from '../../context/Auth'
import AdminDashboard from '../AdminDashboard'
import UserDashboard from '../UserDashboard'

const Dashboard = () => {
	const { userProfile } = useContext(AuthContext)

	return <Layout>{userProfile.isAdmin ? <AdminDashboard userProfile={userProfile} /> : <UserDashboard userProfile={userProfile} />}</Layout>
}

export default Dashboard

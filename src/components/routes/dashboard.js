import React, { useContext } from 'react'
import Layout from '../Layout'
import { AuthContext } from '../../context/Auth'
import AdminDashboard from '../AdminDashboard'
import UserDashboard from '../UserDashboard'

const Dashboard = () => {
	const { userProfile, currentUser } = useContext(AuthContext)

	return <Layout>{currentUser.isAdmin ? <AdminDashboard userProfile={userProfile} /> : <UserDashboard userProfile={userProfile} />}</Layout>
}

export default Dashboard

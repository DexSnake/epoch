import React, { useContext } from 'react'
import Layout from 'components/Layout/Layout'
import { AuthContext } from '../../context/Auth'
import AdminDashboard from '../AdminDashboard'
import UserDashboard from '../UserDashboard'

const Dashboard = () => {
	const { userProfile, currentUser } = useContext(AuthContext)
	return <Layout>{currentUser.accessLevel > 0 ? <AdminDashboard userProfile={userProfile} /> : <UserDashboard userProfile={userProfile} />}</Layout>
}

export default Dashboard

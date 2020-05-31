import React, { useContext, useState } from 'react'
import Layout from '../Layout'
import { AuthContext } from '../../context/Auth'
import AdminDashboard from '../AdminDashboard'
import UserDashboard from '../UserDashboard'
import { functions } from '../../firebase/firebase'

const Dashboard = () => {
	const { userProfile, currentUser } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const addAdminRole = functions.httpsCallable('addAdminRole')
	const createUser = functions.httpsCallable('createUser')

	const makeAdmin = (e) => {
		e.preventDefault()
		addAdminRole({ email: email }).then((result) => {
			console.log(result)
		})
	}

	const makeUser = (e) => {
		e.preventDefault()
		createUser({ email: userEmail, password: userPassword }).then((result) => {
			console.log(result.data.uid)
		})
	}

	return <Layout>{currentUser.isAdmin ? <AdminDashboard userProfile={userProfile} /> : <UserDashboard userProfile={userProfile} />}</Layout>
}

export default Dashboard

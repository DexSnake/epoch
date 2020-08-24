import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'
import LogRocket from 'logrocket'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userProfile, setUserProfile] = useState({})
	const [userStatus, setUserStatus] = useState('')
	const [employeeProfile, setEmployeeProfile] = useState({})
	const [pending, setPending] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
			setPending(false)
		})
	}, [])

	useEffect(() => {
		if (currentUser) {
			currentUser.getIdToken(true)
			currentUser.getIdTokenResult().then((idTokenResult) => {
				currentUser.role = idTokenResult.claims.role
				currentUser.accessLevel = idTokenResult.claims.accessLevel
			})
			db.collection('Employees')
				.doc(currentUser.uid)
				.onSnapshot((doc) => {
					setUserProfile({
						id: doc.id,
						...doc.data()
					})
				})

			db.collection('Employees')
				.doc(currentUser.uid)
				.collection('Time Clock')
				.orderBy('clockIn', 'desc')
				.limit(1)
				.onSnapshot((snapshot) => {
					if (snapshot.docs.length > 0) {
						setUserStatus(snapshot.docs[0].data().status)
					}
				})
		}
		return
	}, [currentUser])

	const setProfile = (data) => {
		setEmployeeProfile(data)
	}
	const updateEmployeeProfile = (data) => {
		setEmployeeProfile({ ...employeeProfile, ...data })
	}

	useEffect(() => {
		if (currentUser) {
			LogRocket.identify(currentUser.uid, {
				name: currentUser.displayName,
				email: currentUser.email
			})
		}
	}, [currentUser])

	if (pending) {
		return <>Loading...</>
	}

	return (
		<AuthContext.Provider
			value={{ currentUser, userProfile, userStatus, setProfile, updateEmployeeProfile, employeeProfile }}
		>
			{children}
		</AuthContext.Provider>
	)
}

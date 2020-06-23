import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userProfile, setUserProfile] = useState({})
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
						...doc.data(),
					})
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

	if (pending) {
		return <>Loading...</>
	}

	return <AuthContext.Provider value={{ currentUser, userProfile, setProfile, updateEmployeeProfile, employeeProfile }}>{children}</AuthContext.Provider>
}

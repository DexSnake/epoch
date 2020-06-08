import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userProfile, setUserProfile] = useState({})
	const [pending, setPending] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
			setPending(false)
		})
	}, [])

	useEffect(() => {
		if (currentUser) {
			currentUser.getIdTokenResult().then((idTokenResult) => {
				currentUser.isAdmin = idTokenResult.claims.isAdmin
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

	if (pending) {
		return <>Loading...</>
	}

	return <AuthContext.Provider value={{ currentUser, userProfile }}>{children}</AuthContext.Provider>
}

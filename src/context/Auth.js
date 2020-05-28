import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userProfile, setUserProfile] = useState({})

	useEffect(() => {
		auth.onAuthStateChanged(setCurrentUser)
	}, [])

	useEffect(() => {
		if (currentUser) {
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

	return <AuthContext.Provider value={{ currentUser, userProfile }}>{children}</AuthContext.Provider>
}

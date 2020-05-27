import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/firebase-storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCojZFGPh8zKvFps-GiqACWAfRhIIZsam0',
	authDomain: 'kstg-6225.firebaseapp.com',
	databaseURL: 'https://kstg-6225.firebaseio.com',
	projectId: 'kstg-6225',
	storageBucket: 'kstg-6225.appspot.com',
	messagingSenderId: '127304247581',
	appId: '1:127304247581:web:0be49bc6fa771c8cd719f4',
	measurementId: 'G-SH0TY3JJSP',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }

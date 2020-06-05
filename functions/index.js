const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.createUser({
			email: data.email,
			password: data.password,
			displayName: data.displayName,
		})
		.then((user) => {
			return admin.auth().setCustomUserClaims(user.uid, {
				isAdmin: true,
			})
		})
		.catch((err) => {
			return err
		})
})

exports.createUser = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.createUser({
			email: data.email,
			password: data.password,
		})
		.then((user) => {
			return user
		})
		.catch((err) => {
			return err
		})
})

exports.disableUser = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.updateUser(data.id, {
			disabled: true,
		})
		.then((user) => {
			return user
		})
		.catch((err) => {
			return err
		})
})

exports.enableUser = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.updateUser(data.id, {
			disabled: false,
		})
		.then((user) => {
			return user
		})
		.catch((err) => {
			return err
		})
})

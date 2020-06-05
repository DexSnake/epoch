const functions = require('firebase-functions')
const admin = require('firebase-admin')
const API_KEY = '9be80350765cea49ea820ed9347b2ea0-a2b91229-1c5b8164'
const DOMAIN = 'sandboxa762ee683ffb4e44a11c1b49de81d9fd.mailgun.org'
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN })
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

exports.sendAdminEmail = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'PTO Tracker <tbutler@kevinsmithgroup.com>',
		to: data.email,
		subject: "You've got admin privleges!",
		text: 'You have been granted admin access to the KSTG PTO Tracker.',
		template: 'template.test',
		'v:password': data.password,
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
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

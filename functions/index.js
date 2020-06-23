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
				role: data.role,
				accessLevel: data.accessLevel,
			})
		})
		.catch((err) => {
			return err
		})
})

exports.getAllUsers = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.listUsers(15)
		.then((result) => {
			return result
		})
		.catch((error) => {
			return error
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

exports.sendRequestEmail = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'PTO Tracker <tbutler@kevinsmithgroup.com>',
		to: 'travisrbutler@gmail.com',
		subject: `New PTO Request from ${data.firstName}`,
		text: `${data.firstName} has submitted a new PTO request for the following date(s):`,
		template: 'template.new.request',
		'v:firstName': data.firstName,
		'v:requestDate': data.requestDate,
		'v:totalHours': data.totalHours,
		'v:startTime': data.startTime,
		'v:comments': data.comments,
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
	})
})

exports.sendRequestEmailMulti = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'PTO Tracker <tbutler@kevinsmithgroup.com>',
		to: 'travisrbutler@gmail.com',
		subject: `New PTO Request from ${data.firstName}`,
		text: `${data.firstName} has submitted a new PTO request for the following date(s):`,
		template: 'template.new.request.multi',
		'v:firstName': data.firstName,
		'v:startDate': data.startDate,
		'v:endDate': data.endDate,
		'v:totalHours': data.totalHours,
		'v:comments': data.comments,
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
	})
})

exports.sendRequestApprovedEmail = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'PTO Tracker <tbutler@kevinsmithgroup.com>',
		to: data.email,
		subject: 'Your request has been approved!',
		text: `Hi ${data.firstName}, just letting you know that your pto request has been approved!`,
		template: 'template.approved.request',
		'v:firstName': data.firstName,
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
	})
})

exports.updateUserPhoto = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.updateUser(data.id, {
			photoURL: data.photoURL,
		})
		.then((user) => {
			return user
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
			displayName: `${data.firstName} ${data.lastName}`,
		})
		.then((user) => {
			return user
		})
		.catch((error) => {
			return error
		})
})

exports.setUserPermissions = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.setCustomUserClaims(data.uid, {
			role: data.role,
			accessLevel: data.accessLevel,
		})
		.then(() => {
			return 'Success.'
		})
		.catch((error) => {
			return error
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

exports.removeUser = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.deleteUser(data.uid)
		.then(() => {
			return 'User Deleted'
		})
		.catch((error) => {
			return 'Something Went Wrong'
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

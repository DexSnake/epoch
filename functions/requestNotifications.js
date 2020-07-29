const functions = require('firebase-functions')
const API_KEY = '9be80350765cea49ea820ed9347b2ea0-a2b91229-1c5b8164'
const DOMAIN = 'sandboxa762ee683ffb4e44a11c1b49de81d9fd.mailgun.org'
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN })

exports.sendRequestEmail = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'Epoch <pto@kevinsmithgroup.com>',
		to: 'asitsis@kevinsmithgroup.com',
		subject: `New PTO Request from ${data.firstName}`,
		text: `${data.firstName} has submitted a new PTO request for the following date(s):`,
		template: 'template.new.request',
		'v:firstName': data.firstName,
		'v:requestDate': data.requestDate,
		'v:totalHours': data.totalHours,
		'v:startTime': data.startTime,
		'v:comments': data.comments
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
	})
})

exports.sendRequestEmailMulti = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'Epoch <pto@kevinsmithgroup.com>',
		to: 'asitsis@kevinsmithgroup.com',
		subject: `New PTO Request from ${data.firstName}`,
		text: `${data.firstName} has submitted a new PTO request for the following date(s):`,
		template: 'template.new.request.multi',
		'v:firstName': data.firstName,
		'v:startDate': data.startDate,
		'v:endDate': data.endDate,
		'v:totalHours': data.totalHours,
		'v:comments': data.comments
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
	})
})

exports.sendRequestApprovedEmail = functions.https.onCall((data, context) => {
	const emailData = {
		from: 'Epoch <pto@kevinsmithgroup.com>',
		to: data.email,
		subject: 'Your request has been approved!',
		text: `Hi ${data.firstName}, just letting you know that your pto request has been approved!`,
		template: 'template.approved.request',
		'v:firstName': data.firstName
	}
	mailgun.messages().send(emailData, (error, body) => {
		console.log(body)
	})
})

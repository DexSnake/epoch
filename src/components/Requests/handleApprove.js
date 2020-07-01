import { functions, db } from '../../firebase/firebase'
import { toast } from 'react-toastify'

const sendRequestApprovedEmail = functions.httpsCallable('requestNotifications-sendRequestApprovedEmail')

export const handleApprove = (id, userId, numberOfHours, firstName, email, status) => {
	db.collection('Requests')
		.doc(id)
		.update({
			status: 'approved',
		})
		.then(() => {
			sendRequestApprovedEmail({ firstName, email })
				.then(() => {})
				.catch((error) => {
					console.log(error)
				})
			db.collection('Employees')
				.doc(userId)
				.get()
				.then((doc) => {
					db.collection('Employees')
						.doc(userId)
						.update({
							pto: {
								availableHours: doc.data().pto.availableHours - numberOfHours,
								pendingHours: status === 'pending' ? doc.data().pto.pendingHours - numberOfHours : doc.data().pto.pendingHours,
								usedHours: doc.data().pto.usedHours + numberOfHours,
							},
						})
						.then(() => {
							toast.success('Request Approved!')
						})
						.catch((err) => {
							console.log(err)
						})
				})
				.catch((err) => {
					console.log(err)
				})
		})
		.catch((err) => {
			console.log(err)
		})
}

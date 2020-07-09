import { db } from '../../firebase/firebase'
import { toast } from 'react-toastify'

export const handleDeny = (id, userId, numberOfHours) => {
	db.collection('Requests')
		.doc(id)
		.update({
			status: 'denied'
		})
		.then(() => {
			db.collection('Employees')
				.doc(userId)
				.get()
				.then((doc) => {
					db.collection('Employees')
						.doc(userId)
						.update({
							pto: {
								availableHours: doc.data().pto.availableHours,
								pendingHours: doc.data().pto.pendingHours - numberOfHours,
								usedHours: doc.data().pto.usedHours
							}
						})
						.then(() => {
							toast.error('Request Denied.')
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

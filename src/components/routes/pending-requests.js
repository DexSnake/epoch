import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import moment from 'moment'
import { db } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PendingRequests = () => {
	const [requests, setRequests] = useState([])

	useEffect(() => {
		db.collection('Requests')
			.where('status', '==', 'pending')
			.onSnapshot((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setRequests(newRequests)
			})
	}, [])

	const handleApprove = (id, userId, numberOfHours) => {
		db.collection('Requests')
			.doc(id)
			.update({
				status: 'approved',
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
									availableHours: doc.data().pto.availableHours - numberOfHours,
									pendingHours: doc.data().pto.pendingHours - numberOfHours,
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
	const handleDeny = (id, userId, numberOfHours) => {
		db.collection('Requests')
			.doc(id)
			.update({
				status: 'denied',
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
									usedHours: doc.data().pto.usedHours,
								},
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

	return (
		<Layout>
			<div className="m-10">
				<h1 className="font-semibold pb-2 text-3xl text-purp-normal mb-4">Pending Requests</h1>
				<div className="flex flex-wrap">
					{requests.length > 0 ? (
						requests
							.sort((a, b) => (a.requestDate.seconds > b.requestDate.seconds ? 1 : -1))
							.map((request) => {
								return (
									<div className="w-1/4 px-3" key={request.id}>
										<div className="p-4 bg-white shadow-lg rounded mb-3 text-purp-normal" key={request.id}>
											<p className="font-semibold pb-2">
												Name:
												<span className="font-normal"> {request.employee}</span>
											</p>
											<p className="font-semibold pb-2">
												Date:<span className="font-normal"> {moment.unix(request.requestDate.seconds).format('MMMM DD, YYYY')}</span>
											</p>
											<p className="font-semibold pb-2">
												Start Time:<span className="font-normal"> {request.startTime}</span>
											</p>
											<p className="font-semibold pb-2">
												Total Hours:<span className="font-normal"> {request.numberOfHours}</span>
											</p>
											<button className="mr-1 bg-green-600 hover:bg-green-800 text-white text-xs rounded px-2 py-1" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
												Approve Request
											</button>
											<button className="ml-1 bg-red-600 hover:bg-red-800 text-white text-xs rounded px-2 py-1" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
												Deny Request
											</button>
										</div>
									</div>
								)
							})
					) : (
						<p>Horay! No Pending Requests! 🎉</p>
					)}
				</div>
				<ToastContainer position="top-center" autoClose={2000} />
			</div>
		</Layout>
	)
}

export default PendingRequests

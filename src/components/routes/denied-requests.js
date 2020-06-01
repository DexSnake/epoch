import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'
import { db } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DeniedRequests = () => {
	const [requests, setRequests] = useState([])
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)

	useEffect(() => {
		db.collection('Requests')
			.where('status', '==', 'denied')
			.onSnapshot((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setRequests(newRequests)
			})
	}, [refresh])

	const handleApprove = (id, userId, numberOfHours) => {
		setLoading(true)
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
									pendingHours: doc.data().pto.pendingHours,
									usedHours: doc.data().pto.usedHours + numberOfHours,
								},
							})
							.then(() => {
								toast.success('Request Approved!')
								setLoading(false)
								setRefresh(!refresh)
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
				<h1 className="font-semibold pb-2 text-3xl text-purp-normal mb-4">Denied Requests</h1>
				<div className="flex flex-wrap">
					{requests.length > 0 ? (
						requests
							.sort((a, b) => (a.requestDate.seconds > b.requestDate.seconds ? 1 : -1))
							.map((request) => {
								return (
									<div className="w-1/4 px-3" key={request.id}>
										<div className="p-6 bg-white shadow-lg rounded mb-3 text-purp-normal" key={request.id}>
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
												{loading ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Change to Approved'}
											</button>
										</div>
									</div>
								)
							})
					) : (
						<p>No Denied Requests! Good Job Boss!</p>
					)}
				</div>
				<ToastContainer position="top-center" autoClose={2000} />
			</div>
		</Layout>
	)
}

export default DeniedRequests

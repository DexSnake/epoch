import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import { db } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'

const Requests = () => {
	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [isLoaded, setisLoaded] = useState(false)
	const [requests, setRequests] = useState([])
	const [{ firstName }, setState] = useState(employeeProfile)

	useEffect(() => {
		setState(employeeProfile)
		return () => {
			setisLoaded(true)
		}
	}, [employeeProfile])

	useEffect(() => {
		if (isLoaded) {
			db.collection('Requests')
				.where('userId', '==', employeeProfile.id)
				.onSnapshot((snapshot) => {
					const requests = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setRequests(requests)
				})
		}
	}, [employeeProfile])

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
		<React.Fragment>
			<div className="px-10 pt-2">
				<p className="uppercase text-purp-normal font-semibold mb-5">Pending Requests</p>
				{requests.filter((request) => request.status === 'pending').length > 0 ? (
					requests
						.filter((request) => request.status === 'pending')
						.sort((a, b) => (a.dates[1] > b.dates[1] ? 1 : -1))
						.map((request) => {
							return request.requestType === 'singleDay' ? (
								<div className="p-6 bg-white shadow rounded mb-3 border-l-4 border-yellow-400" key={request.id}>
									<div className="flex items-center">
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Date</p>
											<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Start Time</p>
											<p>{request.startTime}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Total Hours</p>
											<p>{request.numberOfHours}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Status</p>
											<span className="text-sm text-white px-2 py-1 rounded bg-yellow-400">pending</span>
										</div>
										<div className="w-1/3 px-3 flex justify-end">
											<button className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
												Approved
											</button>
											<button className="ml-3 hover:text-red-600 text-purp-medium font-semibold transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
												Deny
											</button>
										</div>
									</div>
								</div>
							) : (
								<div className="p-6 bg-white shadow rounded mb-3 border-l-4 border-yellow-400" key={request.id}>
									<div className="flex items-center">
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Start Date</p>
											<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">End Date</p>
											<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Total Hours</p>
											<p>{request.numberOfHours}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Status</p>
											<span className="text-sm text-white px-2 py-1 rounded bg-yellow-400">pending</span>
										</div>
										<div className="w-1/3 px-3 flex justify-end">
											<button className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
												Approved
											</button>
											<button className="ml-3 hover:text-red-600 text-purp-medium font-semibold transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
												Deny
											</button>
										</div>
									</div>
								</div>
							)
						})
				) : (
					<p className="text-purp-medium font-semibold">{firstName} does not have any pending requests.</p>
				)}
			</div>
			<div className="px-10 pt-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Approved Requests</p>
				{requests.filter((request) => request.status === 'approved').length > 0 ? (
					requests
						.filter((request) => request.status === 'approved')
						.sort((a, b) => (a.dates[1] > b.dates[1] ? 1 : -1))
						.map((request) => {
							return request.requestType === 'singleDay' ? (
								<div className="p-6 bg-white shadow rounded mb-3 border-l-4 border-green-400" key={request.id}>
									<div className="flex items-center">
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Date</p>
											<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Start Time</p>
											<p>{request.startTime}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Total Hours</p>
											<p>{request.numberOfHours}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Status</p>
											<span className="text-sm text-white px-2 py-1 rounded bg-green-400">approved</span>
										</div>
										<div className="w-1/3 px-3 flex justify-end">
											<button className="ml-1 bg-red-500 hover:bg-red-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
												Change to Denied
											</button>
										</div>
									</div>
								</div>
							) : (
								<div className="p-6 bg-white shadow rounded mb-3 border-l-4 border-green-400" key={request.id}>
									<div className="flex items-center">
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Start Date</p>
											<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">End Date</p>
											<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Total Hours</p>
											<p>{request.numberOfHours}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Status</p>
											<span className="text-sm text-white px-2 py-1 rounded bg-green-400">approved</span>
										</div>
										<div className="w-1/3 px-3 flex justify-end">
											<button className="ml-1 bg-red-500 hover:bg-red-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
												Change to Denied
											</button>
										</div>
									</div>
								</div>
							)
						})
				) : (
					<p className="text-purp-medium font-semibold">{firstName} does not have any approved requests.</p>
				)}
			</div>
			<div className="px-10 pt-8">
				<p className="uppercase text-purp-normal font-semibold mb-5">Denied Requests</p>
				{requests.filter((request) => request.status === 'denied').length > 0 ? (
					requests
						.filter((request) => request.status === 'denied')
						.sort((a, b) => (a.dates[1] > b.dates[1] ? 1 : -1))
						.map((request) => {
							return request.requestType === 'singleDay' ? (
								<div className="p-6 bg-white shadow rounded mb-3 border-l-4 border-red-400" key={request.id}>
									<div className="flex items-center">
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Date</p>
											<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Start Time</p>
											<p>{request.startTime}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Total Hours</p>
											<p>{request.numberOfHours}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Status</p>
											<span className="text-sm text-white px-2 py-1 rounded bg-red-400">denied</span>
										</div>
										<div className="w-1/3 px-3 flex justify-end">
											<button className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
												Change to Approved
											</button>
										</div>
									</div>
								</div>
							) : (
								<div className="p-6 bg-white shadow rounded mb-3 border-l-4 border-red-400" key={request.id}>
									<div className="flex items-center">
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Start Date</p>
											<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">End Date</p>
											<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Total Hours</p>
											<p>{request.numberOfHours}</p>
										</div>
										<div className="w-1/6 px-3">
											<p className="text-purp-normal font-semibold">Status</p>
											<span className="text-sm text-white px-2 py-1 rounded bg-red-400">denied</span>
										</div>
										<div className="w-1/3 px-3 flex justify-end">
											<button className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded px-3 py-2 py-1 transition duration-200 ease" onClick={() => handleApprove(request.id, request.userId, request.numberOfHours)}>
												Change to Approved
											</button>
										</div>
									</div>
								</div>
							)
						})
				) : (
					<p className="text-purp-medium font-semibold">{firstName} does not have any denied requests.</p>
				)}
			</div>

			<ToastContainer position="top-center" autoClose={2000} />
		</React.Fragment>
	)
}

export default Requests

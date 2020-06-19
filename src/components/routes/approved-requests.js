import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiLoading, mdiCalendar, mdiCalendarMonth } from '@mdi/js'
import { db } from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'

const ApprovedRequests = () => {
	const [requests, setRequests] = useState([])
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)

	useEffect(() => {
		db.collection('Requests')
			.where('status', '==', 'approved')
			.onSnapshot((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setRequests(newRequests)
			})
	}, [refresh])

	const handleDeny = (id, userId, numberOfHours) => {
		setLoading(true)
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
									availableHours: doc.data().pto.availableHours + numberOfHours,
									pendingHours: doc.data().pto.pendingHours,
									usedHours: doc.data().pto.usedHours - numberOfHours,
								},
							})
							.then(() => {
								toast.error('Request Denied.')
								setRefresh(!refresh)
								setLoading(false)
							})
							.catch((err) => {
								alert(err)
							})
					})
					.catch((err) => {
						alert(err)
					})
			})
			.catch((err) => {
				alert(err)
			})
	}

	return (
		<Layout>
			<div className="m-10">
				<h1 className="font-semibold pb-2 text-3xl text-purp-normal mb-4">Approved Requests</h1>
				<div className="flex flex-wrap">
					{requests.length > 0 ? (
						requests
							.sort((a, b) => (a.dates[0] > b.dates[0] ? 1 : -1))
							.filter((request) => request.dates[0].toDate() > new Date())
							.map((request) => {
								return request.requestType === 'singleDay' ? (
									<div className="w-1/3 px-3" key={request.id}>
										<div className="bg-white shadow-lg rounded mb-3 text-purp-normal" key={request.id}>
											<div className="p-6">
												<h4 className="font-semibold text-purp-medium pb-4 text-xl uppercase">
													<Icon path={mdiCalendar} size={1} className="inline mr-2" />
													Single Day Request
												</h4>
												<p className="pb-3">
													<span className="font-semibold">{request.employee}</span> is requesting off on <span className="font-semibold">{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</span> starting at{' '}
													<span className="font-semibold">{request.startTime}</span> for a toal of <span className="font-semibold">{request.numberOfHours}</span> hours.
												</p>

												<p>
													Their comments are: <span className="font-semibold">{request.comments}</span>
												</p>
											</div>
											<div className="bg-purp-lightest px-6 py-4 flex justify-end">
												<SubmitButtonWithLoader text="Change to Denied" loadingText="Changing..." color="red" loading={loading} onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)} />
											</div>
										</div>
									</div>
								) : (
									<div className="w-1/3 px-3" key={request.id}>
										<div className="bg-white shadow-lg rounded mb-3 text-purp-normal" key={request.id}>
											<div className="p-6">
												<h4 className="font-semibold text-purp-medium pb-4 text-xl uppercase">
													<Icon path={mdiCalendarMonth} size={1} className="inline mr-2" />
													Single-Day Request
												</h4>
												<p className="pb-3">
													<span className="font-semibold">{request.employee}</span> is requesting off starting <span className="font-semibold">{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</span> and ending{' '}
													<span className="font-semibold">{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</span>
													<span className="font-semibold">{request.startTime}</span> for a toal of <span className="font-semibold">{request.numberOfHours}</span> hours.
												</p>

												<p>
													Their comments are: <span className="font-semibold">{request.comments}</span>
												</p>
											</div>
											<div className="bg-purp-lightest px-6 py-4 flex justify-end">
												<SubmitButtonWithLoader text="Change to Denied" loadingText="Changing..." color="red" loading={loading} onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)} />
											</div>
										</div>
									</div>
								)
							})
					) : (
						<p className="text-purp-medium font-semibold">No Approved Requests.</p>
					)}
				</div>
				<ToastContainer position="top-center" autoClose={2000} />
			</div>
		</Layout>
	)
}

export default ApprovedRequests

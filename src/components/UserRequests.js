import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiCalendarEdit } from '@mdi/js'
import { AuthContext } from '../context/Auth'
import { db } from '../firebase/firebase'

const UserRequests = () => {
	const { currentUser } = useContext(AuthContext)
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const unsubscribe = db
			.collection('Requests')
			.where('userId', '==', currentUser.uid)
			.onSnapshot((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setRequests(newRequests)
			})
		return () => {
			unsubscribe()
		}
	}, [currentUser.uid])

	return (
		<div className="m-10">
			<h1 className="font-semibold text-3xl text-purp-normal mb-4">My Time Off Requests</h1>
			{requests.length > 0 ? (
				requests
					.sort((a, b) => (a.dates[0] > b.dates[0] ? 1 : -1))
					.map((request) => {
						let requestStyles
						let requestBoxStyles
						if (request.status === 'pending') {
							requestStyles = 'bg-yellow-400'
							requestBoxStyles = 'border-yellow-400'
						} else if (request.status === 'approved') {
							requestStyles = 'bg-green-400'
							requestBoxStyles = 'border-green-400'
						} else {
							requestStyles = 'bg-red-400'
							requestBoxStyles = 'border-red-400'
						}
						return request.requestType === 'singleDay' ? (
							<div className={`p-6 bg-white shadow rounded mb-3 border-l-4 ${requestBoxStyles}`} key={request.id}>
								<div className="flex">
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Date</p>
									</div>
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Start Time</p>
									</div>
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Total Hours</p>
									</div>
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Status</p>
									</div>
								</div>
								<div className="flex relative">
									<div className="w-1/4 px-3">
										<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
									</div>
									<div className="w-1/4 px-3">
										<p>{request.startTime}</p>
									</div>
									<div className="w-1/4 px-3">
										<p>{request.numberOfHours}</p>
									</div>
									<div className="w-1/4 px-3">
										<span className={`text-sm text-white px-2 py-1 rounded ${requestStyles}`}>{request.status}</span>
									</div>
									{request.status === 'pending' ? (
										<Link
											to={{
												pathname: `/requests/edit/${request.id}`,
												state: { data: request },
											}}>
											<button className="absolute right-0 bottom-10 uppercase text-sm text-purp-medium hover:text-purp-normal font-semibold transition duration-200 ease-in-out">
												<Icon path={mdiCalendarEdit} size={0.8} className="mr-1 inline" />
												edit
											</button>
										</Link>
									) : null}
								</div>
							</div>
						) : (
							<div className={`p-6 bg-white shadow rounded mb-3 border-l-4 ${requestBoxStyles}`} key={request.id}>
								<div className="flex">
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Start Date</p>
									</div>
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">End Date</p>
									</div>
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Total Hours</p>
									</div>
									<div className="w-1/4 px-3">
										<p className="text-purp-normal font-semibold">Status</p>
									</div>
								</div>
								<div className="flex relative">
									<div className="w-1/4 px-3">
										<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
									</div>
									<div className="w-1/4 px-3">
										<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
									</div>
									<div className="w-1/4 px-3">
										<p>{request.numberOfHours}</p>
									</div>
									<div className="w-1/4 px-3">
										<span className={`text-sm text-white px-2 py-1 rounded ${requestStyles}`}>{request.status}</span>
									</div>
									{request.status === 'pending' ? (
										<Link
											to={{
												pathname: `/requests/edit/${request.id}`,
												state: { data: request },
											}}>
											<button className="absolute right-0 top-20 uppercase text-sm text-purp-medium hover:text-purp-normal font-semibold transition duration-200 ease-in-out">
												<Icon path={mdiCalendarEdit} size={0.8} className="mr-1 inline" />
												edit
											</button>
										</Link>
									) : null}
								</div>
							</div>
						)
					})
			) : (
				<p>You have no requests.</p>
			)}
		</div>
	)
}

export default UserRequests

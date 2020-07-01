import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiCalendar, mdiCalendarMonth, mdiArrowLeftRight } from '@mdi/js'
import { db } from '../../firebase/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const UpcomingRequests = () => {
	const [requests, setRequests] = useState([])
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(addDays(new Date(), 60))

	useEffect(() => {
		const unsubscribe = db
			.collection('Requests')
			.where('status', '==', 'approved')
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
	}, [])

	return (
		<Layout>
			<div className="m-10">
				<div className="flex items-baseline mb-6">
					<div>
						<h1 className="font-semibold text-3xl text-purp-normal mr-4">Upcoming Requests</h1>
					</div>
					<div className="flex items-center text-purp-normal mb-4">
						<div>
							<DatePicker
								className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
								name="startDate"
								showMonthDropdown
								dropdownMode="select"
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								dateFormat="MMMM d, yyyy"
							/>
						</div>
						<div>
							<Icon path={mdiArrowLeftRight} size={1} className="mx-3 inline" />
						</div>
						<div>
							<DatePicker
								className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
								name="endDate"
								showMonthDropdown
								dropdownMode="select"
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								dateFormat="MMMM d, yyyy"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap">
					{requests.filter((request) => request.startDate.toDate() > startDate && request.startDate.toDate() < endDate).length > 0 ? (
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
													<span className="font-semibold">
														{request.employee.firstName} {request.employee.lastName}
													</span>{' '}
													is taking off on <span className="font-semibold">{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</span> starting at <span className="font-semibold">{request.startTime}</span> for a toal of{' '}
													<span className="font-semibold">{request.numberOfHours}</span> hours.
												</p>

												<p>
													Comments: <span className="font-semibold">{request.comments}</span>
												</p>
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
													<span className="font-semibold">
														{request.employee.firstName} {request.employee.lastName}
													</span>{' '}
													is taking off starting <span className="font-semibold">{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</span> and ending{' '}
													<span className="font-semibold">{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</span>
													<span className="font-semibold">{request.startTime}</span> for a toal of <span className="font-semibold">{request.numberOfHours}</span> hours.
												</p>

												<p>
													Comments: <span className="font-semibold">{request.comments}</span>
												</p>
											</div>
										</div>
									</div>
								)
							})
					) : (
						<p className="text-purp-medium font-semibold">No Upcoming Requests.</p>
					)}
				</div>
				<ToastContainer position="top-center" autoClose={2000} />
			</div>
		</Layout>
	)
}

export default UpcomingRequests

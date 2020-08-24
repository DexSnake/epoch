import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'context/Auth'
import Layout from 'components/Layout/Layout'
import Icon from '@mdi/react'
import { mdiArrowLeftRight, mdiCalendarCheck, mdiArrowUpDown } from '@mdi/js'
import { db } from '../../firebase/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import SingleRequestShort from 'components/Requests/SingleRequestShort'
import MultiRequestShort from 'components/Requests/MultiRequestShort'
import UserRequestShort from 'components/skeletons/UserRequestShort'
import NothingHere from 'images/nothingHere.svg'

const UpcomingRequests = () => {
	const { currentUser } = useContext(AuthContext)
	const [requests, setRequests] = useState(null)
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(addDays(new Date(), 60))

	useEffect(() => {
		const unsubscribe = db
			.collection('Requests')
			.where('status', '==', 'approved')
			.onSnapshot((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}))
				setRequests(newRequests.filter((request) => request.userId !== currentUser.uid))
			})
		return () => {
			unsubscribe()
		}
	}, [currentUser.uid])

	console.log(requests && requests.filter((request) => request.startDate.toDate() > addDays(startDate, 20)))

	return (
		<Layout>
			<div className="max-w-6xl mx-auto">
				<div className="m-4 sm:m-10">
					<div className="flex items-baseline justify-between mb-6 flex-wrap">
						<div>
							<h1 className="font-semibold text-3xl text-purp-normal mr-4">
								<Icon path={mdiCalendarCheck} size={2} className="inline pb-1 mr-1" />
								Upcoming Requests
							</h1>
						</div>
						<div className="mx-auto sm:mx-0 mt-3 sm:mt-0 flex flex-wrap items-center flex-col sm:flex-row text-purp-normal mb-4">
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
							<div className="hidden sm:flex">
								<Icon path={mdiArrowLeftRight} size={1} className="mx-3 inline" />
							</div>
							<div className="flex sm:hidden my-2">
								<Icon path={mdiArrowUpDown} size={1} className="mx-3 inline" />
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
						{requests ? (
							requests.length > 0 ? (
								requests
									.filter(
										(request) =>
											request.startDate.toDate() > startDate &&
											request.startDate.toDate() < endDate
									)
									.sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
									.map((request) => {
										return request.requestType === 'singleDay' ? (
											<SingleRequestShort request={request} key={request.id} />
										) : (
											<MultiRequestShort request={request} key={request.id} />
										)
									})
							) : (
								<div className="max-w-xl w-full mx-auto">
									<p className="text-purp-medium font-semibold text-center text-2xl">
										No requests that match that date range...{' '}
									</p>
									<img src={NothingHere} alt="nothing here" className="opacity-50" />
								</div>
							)
						) : (
							<>
								<UserRequestShort />
								<UserRequestShort />
								<UserRequestShort />
							</>
						)}
					</div>
					<ToastContainer position="top-center" autoClose={2000} />
				</div>
			</div>
		</Layout>
	)
}

export default UpcomingRequests

import React, { useContext, useState, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiArrowLeftRight } from '@mdi/js'
import { AuthContext } from 'context/Auth'
import { db } from '../firebase/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserRequest from 'components/skeletons/UserRequest'
import { Select } from './FormFields'
import { addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import SingleRequestLong from './Requests/SingleRequestLong'
import MultiRequestLong from './Requests/MultiRequestLong'
import NothingHere from 'images/nothingHere.svg'

const UserRequests = () => {
	const { currentUser } = useContext(AuthContext)
	const [requests, setRequests] = useState(null)
	const [status, setStatus] = useState('all')
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(addDays(new Date(), 60))

	useEffect(() => {
		const unsubscribe = db
			.collection('Requests')
			.where('userId', '==', currentUser.uid)
			.onSnapshot((snapshot) => {
				const newRequests = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}))
				setRequests(newRequests)
			})
		return () => {
			unsubscribe()
		}
	}, [currentUser.uid])

	return (
		<div className="max-w-6xl mx-auto">
			<div className="m-10">
				<div className="flex justify-between mb-6">
					<h1 className="font-semibold text-3xl text-purp-normal">My Time Off Requests</h1>

					<div className="w-1/2 flex items-center text-purp-normal">
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
					<div className="w-1/6 flex items-center">
						<Select name="filter" onChange={(e) => setStatus(e.target.value)}>
							<option value="all">All</option>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="denied">Denied</option>
						</Select>
					</div>
				</div>
				{requests ? (
					requests.length > 0 ? (
						requests
							.filter((request) =>
								status === 'all' ? request.status !== status : request.status === status
							)
							.filter(
								(request) =>
									request.startDate.toDate() > startDate && request.startDate.toDate() < endDate
							)
							.sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
							.map((request) => {
								return request.requestType === 'singleDay' ? (
									<SingleRequestLong request={request} key={request.id} />
								) : (
									<MultiRequestLong request={request} key={request.id} />
								)
							})
					) : (
						<div className="max-w-xl w-full mx-auto">
							<p className="text-purp-medium font-semibold text-center text-2xl">
								No requests to show...
							</p>
							<img src={NothingHere} alt="nothing here" className="opacity-50" />
						</div>
					)
				) : (
					<>
						<UserRequest />
						<UserRequest />
						<UserRequest />
						<UserRequest />
					</>
				)}

				<ToastContainer position="top-center" autoClose={2000} />
			</div>
		</div>
	)
}

export default UserRequests

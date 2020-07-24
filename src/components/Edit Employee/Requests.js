import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import { db } from '../../firebase/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from '@mdi/react'
import { mdiArrowLeftRight, mdiArrowUpDown } from '@mdi/js'
import { addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import UserRequest from 'components/skeletons/UserRequest'
import SingleRequestShort from 'components/Requests/SingleRequestShort'
import MultiRequestShort from 'components/Requests/MultiRequestShort'

const Requests = () => {
	const { employeeProfile } = useContext(AuthContext)
	const [isLoaded, setisLoaded] = useState(false)
	const [requests, setRequests] = useState(null)
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(addDays(new Date(), 60))
	const [{ firstName, id }, setState] = useState(employeeProfile)

	useEffect(() => {
		setState(employeeProfile)
		return () => {
			setisLoaded(true)
		}
	}, [employeeProfile, isLoaded])

	useEffect(() => {
		if (isLoaded && id) {
			db.collection('Requests')
				.where('userId', '==', id)
				.onSnapshot((snapshot) => {
					const requests = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data()
					}))
					setRequests(requests)
				})
		}
	}, [employeeProfile, isLoaded, id])

	return (
		<React.Fragment>
			<div className="max-w-6xl mx-auto">
				<div className="m-4 sm:m-10">
					<div className="flex flex-col md:flex-row items-center text-purp-normal mb-8">
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
						<div className="hidden md:flex">
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
					<p className="uppercase text-purp-normal font-semibold mb-5">Pending Requests</p>
					<div className="flex flex-wrap">
						{requests ? (
							requests.filter(
								(request) =>
									request.status === 'pending' &&
									request.startDate.toDate() >= startDate &&
									request.startDate.toDate() <= endDate
							).length > 0 ? (
								requests
									.filter(
										(request) =>
											request.status === 'pending' &&
											request.startDate.toDate() >= startDate &&
											request.startDate.toDate() <= endDate
									)
									.sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
									.map((request) => {
										return request.requestType === 'singleDay' ? (
											<SingleRequestShort request={request} key={request.id} footer />
										) : (
											<MultiRequestShort request={request} key={request.id} footer />
										)
									})
							) : (
								<p className="text-purp-medium font-semibold">
									{firstName} does not have any pending requests.
								</p>
							)
						) : (
							<>
								<UserRequest />
								<UserRequest />
							</>
						)}
					</div>
				</div>
				<div className="m-4 sm:m-10">
					<p className="uppercase text-purp-normal font-semibold mb-5">Approved Requests</p>
					<div className="flex flex-wrap">
						{requests ? (
							requests.filter(
								(request) =>
									request.status === 'approved' &&
									request.startDate.toDate() >= startDate &&
									request.startDate.toDate() <= endDate
							).length > 0 ? (
								requests
									.filter(
										(request) =>
											request.status === 'approved' &&
											request.startDate.toDate() >= startDate &&
											request.startDate.toDate() <= endDate
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
								<p className="text-purp-medium font-semibold">
									{firstName} does not have any approved requests.
								</p>
							)
						) : (
							<>
								<UserRequest />
								<UserRequest />
							</>
						)}
					</div>
				</div>
				<div className="m-4 sm:m-10">
					<p className="uppercase text-purp-normal font-semibold mb-5">Denied Requests</p>
					<div className="flex flex-wrap">
						{requests ? (
							requests.filter(
								(request) =>
									request.status === 'denied' &&
									request.startDate.toDate() >= startDate &&
									request.startDate.toDate() <= endDate
							).length > 0 ? (
								requests
									.filter(
										(request) =>
											request.status === 'denied' &&
											request.startDate.toDate() >= startDate &&
											request.startDate.toDate() <= endDate
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
								<p className="text-purp-medium font-semibold">
									{firstName} does not have any denied requests.
								</p>
							)
						) : (
							<>
								<UserRequest />
								<UserRequest />
							</>
						)}
					</div>
				</div>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</React.Fragment>
	)
}

export default Requests

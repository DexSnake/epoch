import React, { useState, useContext, useEffect } from 'react'
import Layout from 'components/Layout/Layout'
import Icon from '@mdi/react'
import { mdiCalendarPlus, mdiLoading } from '@mdi/js'
import { Label, Select, NumberInput, TextArea } from '../FormFields'
import { db, functions } from '../../firebase/firebase'
import { AuthContext } from '../../context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Calendar, DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { addDays, isWeekend } from 'date-fns'

const NewRequest = () => {
	const calcWeekends = (startDate, endDate) => {
		const date = startDate
		let dates = []

		while (date < endDate) {
			if (isWeekend(date)) dates.push(new Date(date))
			date.setDate(date.getDate() + 1)
		}
		return dates
	}

	const { currentUser, userProfile } = useContext(AuthContext)
	const [requestType, setRequestType] = useState('singleDay')
	const [requestDate, setRequestDate] = useState(null)
	const [requestDates, setRequestDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])
	const [startTime, setStartTime] = useState('')
	const [numberOfHours, setNumberOfHours] = useState('')
	const [comments, setComments] = useState('')
	const [disabledDates, setDisabledDates] = useState(calcWeekends(new Date(), addDays(new Date(), 730)))
	const [toggleWeekends, setToggleWeekends] = useState(false)
	const [loading, setLoading] = useState(false)
	const pto = userProfile.pto
	const sendRequestEmail = functions.httpsCallable('requestNotifications-sendRequestEmail')
	const sendRequestEmailMulti = functions.httpsCallable('requestNotifications-sendRequestEmailMulti')

	useEffect(() => {
		if (toggleWeekends) {
			setDisabledDates([])
		} else {
			setDisabledDates(calcWeekends(new Date(), addDays(new Date(), 730)))
		}
	}, [toggleWeekends])

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		let startDate = null
		let endDate = null
		if (requestType === 'singleDay') {
			startDate = requestDate
		} else {
			startDate = requestDates[0].startDate
			endDate = requestDates[0].endDate
		}
		db.collection('Requests')
			.add({
				userId: currentUser.uid,
				employee: { firstName: userProfile.firstName, lastName: userProfile.lastName, email: userProfile.email },
				requestType,
				startTime,
				startDate,
				endDate,
				numberOfHours: parseInt(numberOfHours),
				comments,
				status: 'pending',
			})
			.then((doc) => {
				db.collection('Employees')
					.doc(currentUser.uid)
					.update({
						pto: {
							availableHours: pto.availableHours,
							pendingHours: pto.pendingHours + parseInt(numberOfHours),
							usedHours: pto.usedHours,
						},
					})
					.then(() => {
						if (requestType === 'singleDay') {
							sendRequestEmail({ firstName: userProfile.firstName, requestDate: moment(requestDate).format('MMMM DD, YYYY').toString(), totalHours: numberOfHours, startTime: startTime, comments: comments })
						} else {
							sendRequestEmailMulti({
								firstName: userProfile.firstName,
								startDate: moment(requestDates[0].startDate).format('MMMM DD, YYYY').toString(),
								endDate: moment(requestDates[0].endDate).format('MMMM DD, YYYY').toString(),
								totalHours: numberOfHours,
								comments: comments,
							})
						}
						setLoading(false)
						toast.success('Request Submitted!')
						setRequestDate(null)
						setRequestDates([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])
						setStartTime('')
						setNumberOfHours('')
						setComments('')
					})
			})
			.catch((err) => {
				alert(err)
			})
	}

	return (
		<Layout>
			<div className="flex justify-center m-10">
				<div className="w-full max-w-sm bg-white p-6">
					<h1 className="text-purp-normal font-semibold text-2xl pb-4">
						<Icon path={mdiCalendarPlus} size={1.8} className="inline mr-2 pb-1" />
						New Time Off Request
					</h1>
					<div className="flex flex-wrap">
						<div className="w-1/2 px-3 mb-5">
							<Label name="Single Day" htmlFor="dayType" className="mr-2" />
							<input type="radio" defaultChecked value="singleDay" name="dayType" onChange={(e) => setRequestType(e.target.value)} />
						</div>
						<div className="w-1/2 px-3 mb-5">
							<Label name="Multi-Day" htmlFor="dayType" className="mr-2" />
							<input type="radio" value="multiDay" name="dayType" onChange={(e) => setRequestType(e.target.value)} />
						</div>

						<div className="w-full mb-5">
							<div className="date-picker-no-border">
								{requestType === 'singleDay' ? (
									<>
										<Label name="Date Requested" htmlFor="dateRequested" />
										<div className="w-full flex items-center mt-3">
											<div className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear ${toggleWeekends ? 'bg-green-400' : 'bg-gray-400'}`}>
												<label
													htmlFor="toggle"
													className={`absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${
														toggleWeekends ? 'translate-x-full border-green-400' : 'translate-x-0 border-gray-400'
													}`}></label>
												<input type="checkbox" id="toggle" name="toggle" className="appearance-none w-full h-full active:outline-none focus:outline-none" onChange={() => setToggleWeekends(!toggleWeekends)} />
											</div>
											<Label name="Toggle Weekends" htmlFor="toggle" className="ml-3" />
										</div>
										<Calendar disabledDates={disabledDates} date={requestDate} minDate={new Date()} onChange={(requestDate) => setRequestDate(requestDate)} />
									</>
								) : (
									<>
										<Label name="Dates Requested" htmlFor="dateRequested" />
										<div className="w-full flex items-center mt-3 mb-3">
											<div className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear ${toggleWeekends ? 'bg-green-400' : 'bg-gray-400'}`}>
												<label
													htmlFor="toggle"
													className={`absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${
														toggleWeekends ? 'translate-x-full border-green-400' : 'translate-x-0 border-gray-400'
													}`}></label>
												<input type="checkbox" id="toggle" name="toggle" className="appearance-none w-full h-full active:outline-none focus:outline-none" onChange={() => setToggleWeekends(!toggleWeekends)} />
											</div>
											<Label name="Toggle Weekends" htmlFor="toggle" className="ml-3" />
										</div>
										<DateRange
											moveRangeOnFirstSelection={false}
											disabledDates={disabledDates}
											startDatePlaceholder="Start Date"
											endDatePlaceholder="End Date"
											ranges={requestDates}
											minDate={new Date()}
											onChange={(item) => setRequestDates([item.selection])}
										/>
									</>
								)}
							</div>
						</div>
						{requestType === 'singleDay' ? (
							<>
								<div className="w-1/2 mb-5 px-3">
									<Label name="Start Time" htmlFor="startTime" />
									<Select name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)}>
										<option defaultValue value=""></option>
										<option value="7:00 AM">7:00 AM</option>
										<option value="7:30 AM">7:30 AM</option>
										<option value="8:00 AM">8:00 AM</option>
										<option value="8:30 AM">8:30 AM</option>
										<option value="9:00 AM">9:00 AM</option>
										<option value="9:30 AM">9:30 AM</option>
										<option value="10:00 AM">10:00 AM</option>
										<option value="10:30 AM">10:30 AM</option>
										<option value="11:00 AM">11:00 AM</option>
										<option value="11:30 AM">11:30 AM</option>
										<option value="12:00 PM">12:00 PM</option>
										<option value="12:30 PM">12:30 PM</option>
										<option value="1:00 PM">1:00 PM</option>
										<option value="1:30 PM">1:30 PM</option>
										<option value="2:00 PM">2:00 PM</option>
										<option value="2:30 PM">2:30 PM</option>
										<option value="3:00 PM">3:00 PM</option>
										<option value="3:30 PM">3:30 PM</option>
										<option value="4:00 PM">4:00 PM</option>
										<option value="4:30 PM">4:30 PM</option>
										<option value="5:00 PM">5:00 PM</option>
										<option value="5:30 PM">5:30 PM</option>
										<option value="6:00 PM">6:00 PM</option>
										<option value="6:30 PM">6:30 PM</option>
										<option value="7:00 PM">7:00 PM</option>
									</Select>
								</div>
								<div className="w-1/2 mb-5 px-3">
									<Label name="Total Hours" htmlFor="numberOfHours" />
									<NumberInput name="numberOfHours" min="1" max="8" value={numberOfHours} onChange={(e) => setNumberOfHours(e.target.value)} />
								</div>
							</>
						) : (
							<div className="w-full mb-5 px-3">
								<Label name="Total Hours" htmlFor="numberOfHours" />
								<NumberInput name="numberOfHours" min="1" value={numberOfHours} onChange={(e) => setNumberOfHours(e.target.value)} />
							</div>
						)}
						<div className="w-full mb-5 px-3">
							<Label name="Comments" htmlFor="comments" />
							<TextArea name="comments" rows="2" value={comments} onChange={(e) => setComments(e.target.value)} />
						</div>
						<div>
							<button onClick={handleSubmit} type="submit" className="bg-purp-brightest hover:bg-purp-bright transition rounded duration-200 ease-in-out focus:outline-none text-white block w-full px-8 py-2 font-semibold">
								{loading ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Submit Request'}
							</button>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</Layout>
	)
}

export default NewRequest

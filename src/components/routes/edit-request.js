import React, { useState, useContext, useEffect } from 'react'
import Layout from '../Layout'
import Icon from '@mdi/react'
import { mdiCalendarEdit } from '@mdi/js'
import { Label, Select, NumberInput, TextArea } from '../FormFields'
import { db } from '../../firebase/firebase'
import { AuthContext } from '../../context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Calendar, DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DeleteButton, SubmitButtonWithLoader } from '../UI Elements/Buttons'
import DeleteRequestModal from '../modals/DeleteRequestModal'
import { addDays, isWeekend } from 'date-fns'
import RequestForm from '../skeletons/RequestForm'

const EditRequest = (props) => {
	const data = props.location.state.data
	useEffect(() => {
		const unsubscribe = db
			.collection('Requests')
			.doc(data.id)
			.onSnapshot((doc) => {
				const request = {
					...doc.data(),
					requestDate: doc.data().dates[0].toDate(),
					requestDates: [{ startDate: doc.data().dates[0].toDate(), endDate: doc.data().dates[1] ? doc.data().dates[1].toDate() : null, key: 'selection' }],
				}
				setRequest(request)
				setState(request)
				setRequestDates(request.requestDates)
			})
		return () => {
			unsubscribe()
		}
	}, [data.id])

	const initalState = {
		requestType: '',
		requestDate: '',
		requestDates: [],
		startTime: '',
		numberOfHours: 0,
		comments: '',
	}

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
	const [request, setRequest] = useState(null)
	const [{ requestType, requestDate, startTime, numberOfHours, comments }, setState] = useState(initalState)
	const [requestDates, setRequestDates] = useState(initalState.requestDates)
	const [disabledDates, setDisabledDates] = useState(calcWeekends(new Date(), addDays(new Date(), 730)))
	const [toggleWeekends, setToggleWeekends] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const pto = userProfile.pto

	useEffect(() => {
		if (toggleWeekends) {
			setDisabledDates([])
		} else {
			setDisabledDates(calcWeekends(new Date(), addDays(new Date(), 730)))
		}
	}, [toggleWeekends])

	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleUpdate = (e) => {
		e.preventDefault()
		setLoading(true)
		let dates = []
		if (requestType === 'singleDay') {
			dates.push(requestDate)
		} else {
			dates.push(requestDates[0].startDate)
			dates.push(requestDates[0].endDate)
		}
		db.collection('Requests')
			.doc(data.id)
			.update({
				requestType,
				dates,
				startTime,
				numberOfHours: parseInt(numberOfHours),
				comments,
			})
			.then(() => {
				db.collection('Employees')
					.doc(currentUser.uid)
					.update({
						pto: {
							availableHours: pto.availableHours,
							pendingHours: numberOfHours <= data.numberOfHours ? pto.pendingHours - parseInt(data.numberOfHours - numberOfHours) : pto.pendingHours + parseInt(numberOfHours - data.numberOfHours),
							usedHours: pto.usedHours,
						},
					})
					.then(() => {
						setLoading(false)
						toast.success('Request Updated!')
						setTimeout(() => {
							props.history.push('/requests')
						}, 2000)
					})
			})
			.catch((err) => {
				toast.error(err)
			})
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<Layout>
			{request ? (
				<div className="flex justify-center m-10">
					<div className="w-full max-w-sm bg-white p-6">
						<h1 className="text-purp-normal font-semibold text-2xl pb-4">
							<Icon path={mdiCalendarEdit} size={1.8} className="inline mr-2 pb-1" />
							Edit Time Off Request
						</h1>
						<div className="flex flex-wrap">
							<div className="w-1/2 px-3 mb-5">
								<Label name="Single Day" htmlFor="requestType" className="mr-2" />
								<input type="radio" checked={requestType === 'singleDay'} disabled={request.status === 'approved'} value="singleDay" name="requestType" onChange={handleChange} />
							</div>
							<div className="w-1/2 px-3 mb-5">
								<Label name="Multi-Day" htmlFor="requestType" className="mr-2" />
								<input type="radio" checked={requestType === 'multiDay'} disabled={request.status === 'approved'} value="multiDay" name="requestType" onChange={handleChange} />
							</div>
							<div className="w-full mb-5">
								<div>
									{requestType === 'singleDay' ? (
										<>
											<Label name="Request Date" htmlFor="dateRequested" />
											{request.status === 'approved' ? null : (
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
											)}
											<Calendar
												disabledDates={disabledDates}
												date={requestDate}
												minDate={request.status === 'approved' ? addDays(new Date(), 60) : new Date()}
												onChange={(requestDate) => setState((prevState) => ({ ...prevState, requestDate: requestDate }))}
											/>
										</>
									) : (
										<>
											<Label name="Request Dates" htmlFor="dateRequested" />
											{request.status === 'approved' ? null : (
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
											)}
											<DateRange minDate={request.status === 'approved' ? addDays(new Date(), 60) : new Date()} disabledDates={disabledDates} ranges={requestDates} onChange={(item) => setRequestDates([item.selection])} focusedRange={[0, 0]} />
										</>
									)}
								</div>
							</div>
							{requestType === 'singleDay' ? (
								<>
									<div className="w-1/2 mb-5 px-3">
										<Label name="Start Time" htmlFor="startTime" />
										<Select name="startTime" value={startTime} disabled={request.status === 'approved'} onChange={handleChange}>
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
										<NumberInput disabled={request.status === 'approved'} name="numberOfHours" min="1" max="8" value={numberOfHours} onChange={handleChange} />
									</div>
								</>
							) : (
								<div className="w-full mb-5 px-3">
									<Label name="Total Hours" htmlFor="numberOfHours" />
									<NumberInput disabled={request.status === 'approved'} name="numberOfHours" min="1" value={numberOfHours} onChange={handleChange} />
								</div>
							)}
							<div className="w-full mb-5 px-3">
								<Label name="Comments" htmlFor="comments" />
								<TextArea name="comments" disabled={request.status === 'approved'} rows="2" value={comments} onChange={handleChange} />
							</div>
							<div className="w-full flex items-center justify-between">
								{request.status === 'approved' ? null : <SubmitButtonWithLoader onClick={handleUpdate} disabled={request.status === 'approved'} text="Update Request" loadingText="Updating..." loading={loading} />}
								<DeleteButton onClick={() => setShowModal(true)} text="Delete Request" />
							</div>
						</div>
					</div>
				</div>
			) : (
				<RequestForm />
			)}
			<ToastContainer position="top-center" autoClose={2000} />
			{showModal ? <DeleteRequestModal id={data.id} history={props.history} request={request} pto={pto} closeModal={closeModal} /> : null}
		</Layout>
	)
}

export default EditRequest

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

const EditRequest = (props) => {
	const data = props.location.state.data
	useEffect(() => {
		const unsubscribe = db
			.collection('Requests')
			.doc(data.id)
			.onSnapshot((doc) => {
				const request = {
					...doc.data(),
				}
				setRequest(request)
			})
		return () => {
			unsubscribe()
		}
	}, [])

	const { currentUser, userProfile } = useContext(AuthContext)
	const [request, setRequest] = useState(null)
	const [requestType, setRequestType] = useState(data.requestType)
	const [requestDate, setRequestDate] = useState(data.dates[0].toDate())
	const [requestDates, setRequestDates] = useState([{ startDate: data.dates[0].toDate(), endDate: data.dates[1] ? data.dates[1].toDate() : null, key: 'selection' }])
	const [startTime, setStartTime] = useState(data.startTime)
	const [numberOfHours, setNumberOfHours] = useState(data.numberOfHours)
	const [comments, setComments] = useState(data.comments)
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const pto = userProfile.pto

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
				userId: currentUser.uid,
				employee: `${userProfile.firstName} ${userProfile.lastName}`,
				requestType,
				dates,
				startTime,
				numberOfHours: parseInt(numberOfHours),
				comments,
				status: data.status,
			})
			.then(() => {
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
						setLoading(false)
						toast.success('Request Updated!')
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
								<Label name="Single Day" htmlFor="dayType" className="mr-2" />
								<input type="radio" checked={requestType === 'singleDay'} value="singleDay" name="dayType" onChange={(e) => setRequestType(e.target.value)} />
							</div>
							<div className="w-1/2 px-3 mb-5">
								<Label name="Multi-Day" htmlFor="dayType" className="mr-2" />
								<input type="radio" checked={requestType === 'multiDay'} value="multiDay" name="dayType" onChange={(e) => setRequestType(e.target.value)} />
							</div>
							<div className="w-full mb-5">
								<div className="date-picker-no-border">
									{requestType === 'singleDay' ? (
										<>
											<Label name="Date Requested" htmlFor="dateRequested" />
											<Calendar date={requestDate} onChange={(requestDate) => setRequestDate(requestDate)} />
										</>
									) : (
										<>
											<Label name="Dates Requested" htmlFor="dateRequested" />
											<DateRange ranges={requestDates} minDate={new Date()} onChange={(item) => setRequestDates([item.selection])} />
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
							<div className="w-full flex items-center justify-between">
								<SubmitButtonWithLoader onClick={handleUpdate} text="Update Request" loadingText="Updating..." loading={loading} />
								<DeleteButton onClick={() => setShowModal(true)} text="Delete Request" />
							</div>
						</div>
					</div>
				</div>
			) : null}
			<ToastContainer position="top-center" autoClose={2000} />
			{showModal ? <DeleteRequestModal id={data.id} closeModal={closeModal} /> : null}
		</Layout>
	)
}

export default EditRequest

import React, { useState } from 'react'
import Layout from '../Layout'
import Icon from '@mdi/react'
import { mdiCalendarEdit, mdiLoading } from '@mdi/js'
import { Label, Select, NumberInput, TextArea } from '../FormFields'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { db } from '../../firebase/firebase'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditRequest = (props) => {
	const data = props.location.state.data
	const [requestDate, setRequestDate] = useState(moment.unix(data.requestDate.seconds))
	const [requestDateFocus, setRequestDateFocus] = useState(false)
	const [startTime, setStartTime] = useState(data.startTime)
	const [numberOfHours, setNumberOfHours] = useState(data.numberOfHours)
	const [comments, setComments] = useState(data.comments)
	const [loading, setLoading] = useState(false)
	const [removing, setRemoving] = useState(false)
	const [showRemoveRequestModal, setShowRemoveRequestModal] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		db.collection('Requests')
			.doc(data.id)
			.update({
				requestDate: requestDate._d,
				startTime,
				numberOfHours,
				comments,
			})
			.then(() => {
				setLoading(false)
				toast.success('Request Updated!')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleRemoveRequest = (e) => {
		e.preventDefault()
		setRemoving(true)
		db.collection('Requests')
			.doc(data.id)
			.delete()
			.then(() => {
				setRemoving(false)
				setShowRemoveRequestModal(false)
				props.history.push('/requests')
			})
	}

	return (
		<Layout>
			<div className="flex justify-center m-10">
				<div className="w-full max-w-sm bg-white p-6 rounded shadow-lg">
					<h1 className="text-purp-normal font-semibold text-2xl pb-4">
						<Icon path={mdiCalendarEdit} size={1.8} className="inline mr-2 pb-1" />
						Edit Time Off Request
					</h1>
					<div className="flex flex-wrap">
						<div className="w-1/2 px-3 mb-5">
							<Label name="Single Day" htmlFor="dayType" className="mr-2" />
							<input type="radio" defaultChecked value="singleDay" name="dayType" />
						</div>
						<div className="w-1/2 px-3 mb-5">
							<Label name="Multiple Days" htmlFor="dayType" className="mr-2" />
							<input type="radio" value="multipleDays" name="dayType" />
						</div>
						<div className="w-full mb-5">
							<div className="date-picker-no-border">
								<Label name="Request Date" htmlFor="requestDate" />
								<SingleDatePicker
									date={requestDate}
									onDateChange={(requestDate) => setRequestDate(requestDate)}
									focused={requestDateFocus}
									onFocusChange={() => setRequestDateFocus(!requestDateFocus)}
									numberOfMonths={2}
									anchorDirection="left"
									noBorder={true}
									placeholder=""
								/>
							</div>
						</div>
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
							<Label name="Number of Hours" htmlFor="numberOfHours" />
							<NumberInput name="numberOfHours" min="1" max="8" value={numberOfHours} onChange={(e) => setNumberOfHours(e.target.value)} />
						</div>
						<div className="w-full mb-5 px-3">
							<Label name="Comments" htmlFor="comments" />
							<TextArea name="comments" rows="2" value={comments} onChange={(e) => setComments(e.target.value)} />
						</div>
						<div className="w-full flex items-center">
							<div className="w-1/2 px-1">
								<button type="submit" className="bg-purp-brightest hover:bg-purp-bright rounded transition duration-200 ease-in-out focus:outline-none text-white block w-full px-2 py-2 font-semibold" onClick={handleSubmit}>
									{loading ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Update Request'}
								</button>
							</div>
							<div className="w-1/2 px-1">
								<button className="h-px uppercase text-purp-medium text-sm font-bold transition duration-200 ease-in-out hover:text-red-600" onClick={() => setShowRemoveRequestModal(true)}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showRemoveRequestModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none" style={{ maxHeight: '80vh' }}>
								<div className="flex items-start p-5 rounded-t bg-purp-lightest">
									<h3 className="text-2xl text-purp-normal">Cancel Request?</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition duration-300 ease transform hover:rotate-45"
										onClick={() => setShowRemoveRequestModal(false)}>
										<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
									</button>
								</div>
								<div className="relative p-6 flex-auto">
									<div className="flex flex-col">
										<p className="mb-3">Are you sure you want to cancel this request?</p>
										<p>This action cannot be un-done.</p>
									</div>
								</div>
								<div className="flex items-center justify-end px-5 pb-5 rounded-b">
									<button className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={() => setShowRemoveRequestModal(false)}>
										Cancel
									</button>
									<button className="bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={handleRemoveRequest}>
										{removing ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Remove'}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<ToastContainer position="top-center" autoClose={2000} />
		</Layout>
	)
}

export default EditRequest

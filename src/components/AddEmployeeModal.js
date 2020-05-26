import React, { useState, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiAccountPlus } from '@mdi/js'
import { mdiLoading } from '@mdi/js'
import { db, storage } from '../firebase/firebase'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import NumberFormat from 'react-number-format'

const AddEmployeeModal = (props) => {
	const initialState = {
		firstName: '',
		middleName: '',
		lastName: '',
		dateOfBirth: null,
		ssn: '',
		title: '',
		startDate: null,
		image: null,
	}

	useEffect(() => {
		setShowModal(props.showModal)
	}, [props.showModal])

	const [{ firstName, middleName, lastName, title, dateOfBirth, ssn, startDate, image }, setState] = React.useState(initialState)
	const [showModal, setShowModal] = useState(props.showModal)
	const [error, setError] = useState('')
	const [sending, setSending] = useState(false)
	const [startDateFocus, setStartDateFocus] = useState(false)
	const [dobFocus, setDobFocus] = useState(false)

	const handleModal = (state) => {
		props.onUpdate(state)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (firstName && lastName) {
			setSending(true)
			const uploadTask = storage.ref(`employee-photos/${image.name}`).put(image)
			uploadTask.on(
				'state_changed',
				(snapshot) => {},
				(error) => {
					console.log(error)
				},
				() => {
					storage
						.ref('employee-photos')
						.child(image.name)
						.getDownloadURL()
						.then((url) => {
							db.collection('Employees')
								.add({
									firstName,
									middleName,
									lastName,
									dateOfBirth: dateOfBirth._d,
									ssn,
									title,
									startDate: startDate._d,
									imageUrl: url,
								})
								.then(() => {
									setShowModal(false)
									handleModal(false)
									setState({ ...initialState })
									setSending(false)
									setError('')
									props.history.push('/employees')
								})
								.catch(function (error) {
									console.error('Error adding document: ', error)
								})
						})
				}
			)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleStartDateChange = (startDate) => {
		setState((prevState) => ({ ...prevState, startDate }))
	}

	const handleDobChange = (dateOfBirth) => {
		setState((prevState) => ({ ...prevState, dateOfBirth }))
	}

	const handleFile = (e) => {
		const { name, files } = e.target
		setState((prevState) => ({ ...prevState, [name]: files[0] }))
	}

	const handleCancel = () => {
		setShowModal(false)
		handleModal(false)
		setError('')
		setState({ ...initialState })
	}

	return showModal ? (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none" style={{ maxHeight: '80vh' }}>
						{/*header*/}
						<div className="flex items-start p-5 rounded-t bg-purp-lightest">
							<Icon path={mdiAccountPlus} size={1.5} color="#414255" className="mr-3" />
							<h3 className="text-2xl text-purp-normal">Add Employee</h3>
							<button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition duration-300 ease transform hover:rotate-45" onClick={handleCancel}>
								<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
							</button>
						</div>
						{/*body*/}
						<form onSubmit={handleSubmit}>
							<div className="relative p-6 flex-auto">
								<p className="font-semibold text-purp-light uppercase pl-2 pb-3">Personal Info</p>
								<div className="flex flex-wrap">
									<div className="w-1/3 px-2 pb-4">
										<input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={handleChange} className="border border-purp-light p-2 w-full rounded-sm" />
									</div>
									<div className="w-1/3 px-2 pb-4">
										<input type="text" placeholder="Middle Name" name="middleName" value={middleName} onChange={handleChange} className="border border-purp-light p-2 w-full rounded-sm" />
									</div>
									<div className="w-1/3 px-2 pb-4">
										<input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={handleChange} className="border border-purp-light p-2 w-full rounded-sm" />
									</div>
									<div className="w-1/3 px-2 pb-4">
										<SingleDatePicker
											date={dateOfBirth}
											onDateChange={handleDobChange}
											focused={dobFocus}
											onFocusChange={() => setDobFocus(!dobFocus)}
											placeholder="Date of Birth"
											numberOfMonths={1}
											isOutsideRange={() => false}
											anchorDirection="left"
											showClearDate={true}
											id="dateOfBirth"
										/>
									</div>
									<div className="w-1/3 px-2 pb-4">
										<NumberFormat format="###-##-####" name="ssn" value={ssn} onChange={handleChange} placeholder="SSN" className="border border-purp-light p-2 w-full rounded-sm" />
									</div>
								</div>
								<p className="font-semibold text-purp-light uppercase pl-2 pb-3 mt-6">Job Related</p>
								<div className="flex flex-wrap">
									<div className="w-1/3 px-2 pb-4">
										<input type="text" placeholder="Title" name="title" value={title} onChange={handleChange} className="border border-purp-light p-2 w-full rounded-sm" />
									</div>
									<div className="w-1/3 px-2 pb-4">
										<SingleDatePicker
											date={startDate}
											onDateChange={handleStartDateChange}
											focused={startDateFocus}
											onFocusChange={() => setStartDateFocus(!startDateFocus)}
											placeholder="Start Date"
											numberOfMonths={1}
											isOutsideRange={() => false}
											anchorDirection="left"
											showClearDate={true}
											id="startDate"
										/>
									</div>
								</div>
								<p className="font-semibold text-purp-light uppercase pl-2 pb-3 mt-6">Employee Photo</p>
								<input type="file" name="image" onChange={handleFile} className="pl-2" />
							</div>
							{/*footer*/}
							{error ? <p className="text-red-600 text-right px-6 py-2">{error}</p> : null}
							<div className="flex items-center justify-end px-5 pb-5 rounded-b">
								<button className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={handleCancel} style={{ display: sending ? 'none' : 'block' }}>
									Cancel
								</button>
								<button type="submit" className="bg-purp-brightest text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded hover:bg-purp-bright outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease">
									{sending ? <Icon path={mdiLoading} spin={(true, 1)} size={1} /> : 'Save Changes'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	) : null
}

export default AddEmployeeModal

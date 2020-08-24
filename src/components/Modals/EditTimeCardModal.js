import React, { useState } from 'react'
import { db } from '../../firebase/firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import { SubmitButtonWithLoader } from 'components/UI Elements/Buttons'
import { Label } from 'components/FormFields'

const EditTimeCardModal = ({ user, data, closeModal }) => {
	const [loading, setLoading] = useState(false)
	const [timeCard, setTimeCard] = useState(data)
	const [clockIn, setClockIn] = useState(data.clockIn.toDate())
	const [clockOut, setClockOut] = useState(data.clockOut.toDate())
	const [lunchIn, setLunchIn] = useState(data.lunchIn.toDate())
	const [lunchOut, setLunchOut] = useState(data.lunchOut.toDate())

	console.log(user)
	console.log(data)

	const handleUpdate = () => {
		db.collection('Employees')
			.doc(user)
			.collection('Time Clock')
			.doc(data.id)
			.update({
				clockIn,
				lunchIn,
				lunchOut,
				clockOut
			})
			.then(() => {
				closeModal()
				toast.success('Time Card Updated!')
			})
			.catch((error) => {
				alert(error.message)
			})
	}

	if (!timeCard) {
		return <p>Getting Time Card...</p>
	}

	return (
		<React.Fragment>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div
						className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none"
						style={{ maxHeight: '80vh' }}
					>
						<div className="flex items-start p-5 rounded-t bg-purp-lightest">
							<h3 className="text-2xl text-purp-normal">Edit Time Card</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-4xl leading-none outline-none focus:outline-none"
								onClick={closeModal}
							>
								<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
									×
								</span>
							</button>
						</div>
						<div className="relative p-6 flex-auto">
							<div className="flex mb-6">
								<div className="mr-4">
									<Label name="Clock-in" htmlFor="clockIn" />
									<DatePicker
										id="clockIn"
										className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
										selected={clockIn}
										onChange={(date) => setClockIn(date)}
										showTimeSelect
										open={false}
										timeFormat="HH:mm"
										timeIntervals={1}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</div>
								<div>
									<Label name="Clock-out" htmlFor="clockOut" />
									<DatePicker
										id="clockOut"
										className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
										selected={clockOut}
										onChange={(date) => setClockOut(date)}
										showTimeSelect
										open={false}
										timeFormat="HH:mm"
										timeIntervals={1}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</div>
							</div>
							<div className="flex mb-6">
								<div>
									<Label name="Lunch Start" htmlFor="lunchIn" />
									<DatePicker
										id="lunchIn"
										className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
										selected={lunchIn}
										onChange={(date) => setLunchIn(date)}
										showTimeSelect
										open={false}
										timeFormat="HH:mm"
										timeIntervals={1}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</div>
								<div className="ml-auto">
									<Label name="Lunch End" htmlFor="lunchOut" />
									<DatePicker
										id="lunchOut"
										className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
										selected={lunchOut}
										onChange={(date) => setLunchOut(date)}
										showTimeSelect
										open={false}
										timeFormat="HH:mm"
										timeIntervals={1}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<SubmitButtonWithLoader
									onClick={handleUpdate}
									loading={loading}
									text="Update"
									loadingText="Updating..."
								/>
							</div>
						</div>
						<div className="flex items-center justify-end px-5 pb-5 rounded-b"></div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</React.Fragment>
	)
}

export default EditTimeCardModal

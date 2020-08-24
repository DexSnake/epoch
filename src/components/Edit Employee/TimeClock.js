import React, { useState, useContext, useEffect } from 'react'
import { db } from '../../firebase/firebase'
import Icon from '@mdi/react'
import { mdiDownload } from '@mdi/js'
import moment from 'moment'
import { addDays, subDays } from 'date-fns'
import TimeCard from 'components/Time Clock/TimeCard'
import DateRangeSelector from 'components/Time Clock/DateRangeSelector'
import { AuthContext } from 'context/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CSVLink } from 'react-csv'

const TimeClock = () => {
	const d = new Date()
	const [allTimeCards, setAllTimeCards] = useState(null)
	const [startDate, setStartDate] = useState(subDays(d.setHours(0, 0, 0, 0), 7))
	const [endDate, setEndDate] = useState(addDays(d.setHours(23, 59, 59, 0), 0))
	const [allHours, setAllHours] = useState(0)

	const { currentUser, employeeProfile, updateEmployeeProfile } = useContext(AuthContext)
	const [{ id }, setState] = useState(employeeProfile)

	const data = { id }

	useEffect(() => {
		setState(employeeProfile)
	}, [employeeProfile])

	useEffect(() => {
		updateEmployeeProfile(data)
	}, [id])

	useEffect(() => {
		if (allTimeCards && allTimeCards.length > 0) {
			const nums = allTimeCards.map((card) => card.totalHours).reduce((a, b) => a + b)
			setAllHours(nums.toFixed(2))
		} else {
			setAllHours(0)
		}
	}, [allTimeCards])

	useEffect(() => {
		if (id) {
			db.collection('Employees')
				.doc(id)
				.collection('Time Clock')
				.where('completed', '==', true)
				.where('clockIn', '>=', startDate)
				.where('clockIn', '<=', endDate)
				.orderBy('clockIn', 'desc')
				.onSnapshot((snapshot) => {
					const timeCards = snapshot.docs.map((doc) => ({
						id: doc.id,
						totalHours: calculateHours(
							doc.data().clockIn.toDate(),
							doc.data().clockOut.toDate(),
							doc.data().lunchIn.toDate(),
							doc.data().lunchOut.toDate()
						),
						...doc.data()
					}))
					setAllTimeCards(timeCards)
				})
		}
	}, [startDate, endDate, id])

	const calculateHours = (clockin, clockout, lunch1, lunch2) => {
		const start = moment(clockin)
		const end = moment(clockout)

		const lunchin = lunch1 && moment(lunch1)
		const lunchout = lunch2 && moment(lunch2)

		const duration = moment.duration(end.diff(start))
		const lunchDuration = lunch1 && moment.duration(lunchout.diff(lunchin))

		const hours = parseInt(duration.asMinutes())
		const lunchHours = lunch1 ? parseInt(lunchDuration.asMinutes()) : 0

		const totalHours = (hours - lunchHours) / 60

		return totalHours
	}

	const updateStartDate = (date) => {
		setStartDate(addDays(date.setHours(0, 0, 0, 0), 0))
	}

	const updateEndDate = (date) => {
		setEndDate(addDays(date.setHours(23, 59, 59, 0), 0))
	}

	const csvData =
		allTimeCards &&
		allTimeCards.map((card) => {
			return {
				'Total Hours': card.totalHours.toFixed(2),
				'Clock In': card.clockIn.toDate(),
				'Clock Out': card.clockOut.toDate(),
				'Lunch Start': card.lunchIn.toDate(),
				'Lunch End': card.lunchOut.toDate()
			}
		})

	return (
		<div className="max-w-6xl mx-auto">
			<div className="px-10 pt-8 mb-4">
				<p className="uppercase text-purp-normal font-semibold">Completed Time Cards</p>
			</div>
			<div className="mx-4 sm:mx-10 relative">
				<DateRangeSelector
					startDate={startDate}
					endDate={endDate}
					updateStartDate={updateStartDate}
					updateEndDate={updateEndDate}
					allHours={allHours}
				/>
				<span className="focus:outline-none text-purp-medium hover:text-purp-normal absolute right-0 top-6">
					{allTimeCards && allTimeCards.length > 0 && (
						<CSVLink data={csvData}>
							<Icon path={mdiDownload} size={1} />
						</CSVLink>
					)}
				</span>
				<div className="mt-4">
					{allTimeCards && allTimeCards.length > 0 ? (
						allTimeCards.map((timeCard) => {
							return <TimeCard data={timeCard} currentUser={currentUser} user={id} key={timeCard.id} />
						})
					) : (
						<p>There are no time cards that match those dates.</p>
					)}
				</div>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</div>
	)
}

export default TimeClock

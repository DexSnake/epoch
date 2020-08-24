import React, { useState, useContext } from 'react'
import Layout from 'components/Layout/Layout'
import Icon from '@mdi/react'
import { mdiClockOutline } from '@mdi/js'
import { Clock } from 'components/Clock'
import { db } from '../../firebase/firebase'
import { AuthContext } from 'context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import moment from 'moment'

import { addDays, subDays } from 'date-fns'
import PunchButtons from 'components/Time Clock/PunchButtons'
import TimeCard from 'components/Time Clock/TimeCard'
import DateRangeSelector from 'components/Time Clock/DateRangeSelector'

const TimeClock = () => {
	const d = new Date()
	const [clockIn, setClockIn] = useState(null)
	const [lunchIn, setLunchIn] = useState(null)
	const [lunchOut, setLunchOut] = useState(null)
	const [clockOut, setClockOut] = useState(null)
	const [status, setStatus] = useState('Clocked Out')
	const [CurrentTimeCard, setCurrentTimeCard] = useState(null)
	const [allTimeCards, setAllTimeCards] = useState(null)
	const [lastDoc, setLastDoc] = useState(null)
	const [startDate, setStartDate] = useState(subDays(d.setHours(0, 0, 0, 0), 7))
	const [endDate, setEndDate] = useState(addDays(d.setHours(23, 59, 59, 0), 0))
	const [allHours, setAllHours] = useState(0)
	const { currentUser } = useContext(AuthContext)

	const newTimeCard = () => {
		db.collection('Employees')
			.doc(currentUser.uid)
			.collection('Time Clock')
			.add({
				clockIn: new Date(),
				completed: false,
				status: 'Clocked In'
			})
			.then(() => {
				toast.success('Clocked In!')
			})
			.catch((error) => {
				alert(error.message)
			})
	}

	const handleLunchIn = () => {
		db.collection('Employees')
			.doc(currentUser.uid)
			.collection('Time Clock')
			.doc(CurrentTimeCard.id)
			.update({
				lunchIn: new Date(),
				status: 'On Lunch'
			})
			.then(() => {
				toast.success('Lunch Time!')
			})
			.catch((error) => {
				alert(error.message)
			})
	}

	const handleLunchOut = () => {
		db.collection('Employees')
			.doc(currentUser.uid)
			.collection('Time Clock')
			.doc(CurrentTimeCard.id)
			.update({
				lunchOut: new Date(),
				status: 'Clocked In'
			})
			.then(() => {
				toast.success('Welcome Back!')
			})
			.catch((error) => {
				alert(error.message)
			})
	}

	const handleClockOut = () => {
		db.collection('Employees')
			.doc(currentUser.uid)
			.collection('Time Clock')
			.doc(CurrentTimeCard.id)
			.update({
				clockOut: new Date(),
				completed: true,
				status: 'Clocked Out'
			})
			.then(() => {
				toast.success('See Ya!')
				reset()
			})
			.catch((error) => {
				alert(error.message)
			})
	}

	const reset = () => {
		setClockIn(null)
		setLunchIn(null)
		setLunchOut(null)
		setClockOut(null)
		setCurrentTimeCard(null)
		setStatus('Clocked Out')
	}

	useEffect(() => {
		if (allTimeCards && allTimeCards.length > 0) {
			const nums = allTimeCards.map((card) => card.totalHours).reduce((a, b) => a + b)
			setAllHours(nums.toFixed(2))
		} else {
			setAllHours(0)
		}
	}, [allTimeCards])

	useEffect(() => {
		db.collection('Employees')
			.doc(currentUser.uid)
			.collection('Time Clock')
			.where('completed', '==', false)
			.onSnapshot((snapshot) => {
				const timeCards = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}))
				if (timeCards.length === 1) {
					setCurrentTimeCard(timeCards[0])
					setClockIn(timeCards[0].clockIn.toDate())
					setLunchIn(timeCards[0].lunchIn ? timeCards[0].lunchIn.toDate() : null)
					setLunchOut(timeCards[0].lunchOut ? timeCards[0].lunchOut.toDate() : null)
					setStatus(timeCards[0].status)
				}
			})
	}, [currentUser.uid])

	useEffect(() => {
		db.collection('Employees')
			.doc(currentUser.uid)
			.collection('Time Clock')
			.where('completed', '==', true)
			.where('clockIn', '>=', startDate)
			.where('clockIn', '<=', endDate)
			.orderBy('clockIn', 'desc')
			.onSnapshot((snapshot) => {
				setLastDoc(snapshot.docs[snapshot.docs.length - 1])
				const timeCards = snapshot.docs.map((doc) => ({
					id: doc.id,
					totalHours: calculateHours(
						doc.data().clockIn,
						doc.data().clockOut,
						doc.data().lunchIn,
						doc.data().lunchOut
					),
					...doc.data()
				}))
				setAllTimeCards(timeCards)
			})
	}, [startDate, endDate, currentUser.uid])

	const calculateHours = (clockin, clockout, lunch1, lunch2) => {
		const start = moment(clockin.toDate())
		const end = moment(clockout.toDate())

		const lunchin = lunch1 && moment(lunch1.toDate())
		const lunchout = lunch2 && moment(lunch2.toDate())

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

	return (
		<Layout>
			<div className="max-w-6xl mx-auto">
				<div className="m-4 sm:m-10">
					<div className="flex justify-between">
						<h1 className="text-xl sm:text-3xl text-purp-normal font-semibold mb-4">
							<Icon path={mdiClockOutline} size={2.1} className="inline pb-2 mr-1" />
							Time Clock
						</h1>
					</div>
					<div className="flex items-center flex-col">
						<Clock />
					</div>
					<PunchButtons
						times={{ clockIn, lunchIn, lunchOut, clockOut }}
						newTimeCard={newTimeCard}
						handleLunchIn={handleLunchIn}
						handleLunchOut={handleLunchOut}
						handleClockOut={handleClockOut}
					/>
					<div className="text-center mt-4">
						{clockIn && (
							<p className="font-semibold text-xl text-purp-normal">
								Clocked in since {moment(clockIn).format('h:m A')}
							</p>
						)}
					</div>
					<DateRangeSelector
						startDate={startDate}
						endDate={endDate}
						updateStartDate={updateStartDate}
						updateEndDate={updateEndDate}
						allHours={allHours}
					/>
					<div className="mt-4">
						{allTimeCards && allTimeCards.length > 0 ? (
							allTimeCards.map((timeCard) => {
								return <TimeCard data={timeCard} currentUser={currentUser} key={timeCard.id} />
							})
						) : (
							<p>There are no time cards that match those dates.</p>
						)}
					</div>
				</div>
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</Layout>
	)
}

export default TimeClock

import React, { useState } from 'react'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiClockAlertOutline } from '@mdi/js'
import EditTimeCardModal from 'components/Modals/EditTimeCardModal'

const TimeCard = ({ data, currentUser, user }) => {
	const [showModal, setShowModal] = useState(false)

	const handleCloseModal = () => {
		setShowModal(false)
	}

	return (
		<React.Fragment>
			<div className="bg-white shadow-lg border-t-4 rounded-b border-green-500 p-6 mb-8">
				<div className="mb-4 text-purp-medium flex justify-between">
					<span className="font-semibold text-xl">
						{moment(data.clockIn.toDate()).format('dddd MMMM DD, YYYY')}
					</span>
					{currentUser.accessLevel > 1 && (
						<button onClick={() => setShowModal(true)} className="text-purp-medium hover:text-purp-normal">
							<Icon path={mdiClockAlertOutline} size={1} />
						</button>
					)}
				</div>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<span className="font-bold">Clock-in</span>
						<span>
							{data.clockIn.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="font-bold">Lunch Start</span>
						<span>
							{data.lunchIn &&
								data.lunchIn.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="font-bold">Lunch End</span>
						<span>
							{data.lunchOut &&
								data.lunchOut.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="font-bold">Clock-out</span>
						<span>
							{data.clockOut.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="font-bold">Total Hours</span>
						<span>{data.totalHours.toFixed(2)}</span>
					</div>
				</div>
			</div>
			{showModal && <EditTimeCardModal user={user} data={data} closeModal={handleCloseModal} />}
		</React.Fragment>
	)
}

export default TimeCard

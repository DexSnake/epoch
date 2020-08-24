import React from 'react'

const PunchButtons = ({ newTimeCard, handleClockOut, handleLunchIn, handleLunchOut, times }) => {
	return (
		<div className="flex justify-center mb-16">
			<button
				className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded text-white mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={newTimeCard}
				disabled={times.clockIn}
			>
				Clock In
			</button>
			<button
				className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={handleLunchIn}
				disabled={!times.clockIn || times.lunchIn}
			>
				Start Lunch
			</button>
			<button
				className="px-3 py-2 bg-orange-500 hover:bg-orange-600 rounded text-white mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={handleLunchOut}
				disabled={!times.lunchIn || times.lunchOut}
			>
				End Lunch
			</button>
			<button
				className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={handleClockOut}
				disabled={!times.clockIn || (times.lunchIn && !times.lunchOut)}
			>
				Clock Out
			</button>
		</div>
	)
}

export default PunchButtons

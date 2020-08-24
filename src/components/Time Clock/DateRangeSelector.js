import React from 'react'
import Icon from '@mdi/react'
import { mdiArrowUpDown, mdiArrowLeftRight } from '@mdi/js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateRangeSelector = ({ startDate, endDate, updateStartDate, updateEndDate, allHours }) => {
	return (
		<div className="mx-auto sm:mx-0 flex flex-wrap items-center flex-col sm:flex-row text-purp-normal">
			<div>
				<DatePicker
					className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
					name="startDate"
					showMonthDropdown
					dropdownMode="select"
					selected={startDate}
					onChange={(date) => updateStartDate(date)}
					dateFormat="MMMM d, yyyy"
				/>
			</div>
			<div className="hidden sm:flex">
				<Icon path={mdiArrowLeftRight} size={1} className="mx-3 inline" />
			</div>
			<div className="flex sm:hidden my-2">
				<Icon path={mdiArrowUpDown} size={1} className="mx-3 inline" />
			</div>
			<div>
				<DatePicker
					className="disabled:bg-white disabled:text-purp-medium focus:outline-none border rounded px-2 py-1 font-semibold text-purp-normal"
					name="endDate"
					showMonthDropdown
					dropdownMode="select"
					selected={endDate}
					onChange={(date) => updateEndDate(date)}
					dateFormat="MMMM d, yyyy"
				/>
			</div>
			{allHours > 0 && (
				<div className="flex justify-end ml-auto mr-10 text-xl">
					<span className="font-semibold mr-2">Total Hours:</span>
					<span>{allHours}</span>
				</div>
			)}
		</div>
	)
}

export default DateRangeSelector

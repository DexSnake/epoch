import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../../context/Auth'
import Icon from '@mdi/react'
import { mdiCalendarEdit } from '@mdi/js'
import { handleApprove } from './handleApprove'
import { handleDeny } from './handleDeny'

const MultiRequestLong = ({ request }) => {
	const { currentUser } = useContext(AuthContext)
	let statusColorBackground
	let statusColorBorder
	if (request.status === 'pending') {
		statusColorBackground = 'bg-yellow-400'
		statusColorBorder = 'border-yellow-400'
	} else if (request.status === 'approved') {
		statusColorBackground = 'bg-green-500'
		statusColorBorder = 'border-green-500'
	} else {
		statusColorBackground = 'bg-red-500'
		statusColorBorder = 'border-red-500'
	}
	return (
		<div className={`p-6 bg-white shadow rounded mb-3 border-l-4 ${statusColorBorder}`}>
			<div className="flex items-center">
				<div className="w-1/5 px-3">
					<p className="text-purp-normal font-semibold">Start Date</p>
					<p>{moment(request.dates[0].toDate()).format('MMMM DD, YYYY')}</p>
				</div>
				<div className="w-1/5 px-3">
					<p className="text-purp-normal font-semibold">End Date</p>
					<p>{moment(request.dates[1].toDate()).format('MMMM DD, YYYY')}</p>
				</div>
				<div className="w-1/5 px-3">
					<p className="text-purp-normal font-semibold">Total Hours</p>
					<p>{request.numberOfHours}</p>
				</div>
				<div className="w-1/5 px-3">
					<p className="text-purp-normal font-semibold">Status</p>
					<span className={`text-sm text-white px-2 py-1 rounded ${statusColorBackground}`}>{request.status}</span>
				</div>
				{currentUser.accessLevel > 0 ? (
					request.status === 'pending' ? (
						<div className="w-1/5 px-3 flex justify-end">
							<button
								className="ml-1 bg-green-500 hover:bg-green-700 text-white font-semibold text-sm rounded px-3 py-2 transition duration-200 ease"
								onClick={() => handleApprove(request.id, request.userId, request.numberOfHours, request.employee.firstName, request.employee.email, request.status)}>
								Approve
							</button>
							<button className="ml-3 hover:text-red-600 text-purp-medium font-semibold transition duration-200 ease" onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}>
								Deny
							</button>
						</div>
					) : (
						<div className="w-1/5 px-3 flex justify-end">
							{request.status === 'approved' ? null : (
								<button
									className="ml-1 bg-green-500 hover:bg-green-700 text-white text-sm font-semibold rounded px-3 py-2 transition duration-200 ease"
									onClick={() => handleApprove(request.id, request.userId, request.numberOfHours, request.employee.firstName, request.employee.email, request.status)}>
									Approve
								</button>
							)}
						</div>
					)
				) : request.status === 'denied' ? null : (
					<div className="w-1/5 px-3 flex justify-end">
						<Link
							to={{
								pathname: `/requests/edit/${request.id}`,
								state: { data: request },
							}}>
							<button className="uppercase text-sm text-purp-medium hover:text-purp-normal font-semibold transition duration-200 ease-in-out">
								<Icon path={mdiCalendarEdit} size={0.8} className="mr-1 inline" />
								edit
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default MultiRequestLong

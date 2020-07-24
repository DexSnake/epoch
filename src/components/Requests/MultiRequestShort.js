import React from 'react'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiCalendarMonth } from '@mdi/js'
import { handleApprove } from './handleApprove'
import { handleDeny } from './handleDeny'
import { ApproveButton } from 'components/UI Elements/Buttons'

const MultiRequestShort = ({ request, footer }) => {
	let requestStyles
	if (request.status === 'pending') {
		requestStyles = 'border-yellow-400'
	} else if (request.status === 'approved') {
		requestStyles = 'border-green-500'
	} else {
		requestStyles = 'border-red-500'
	}
	return (
		<div className="w-full lg:w-1/2 xl:w-1/3 px-3 mb-6">
			<div
				className={`flex flex-col bg-white shadow-lg rounded text-purp-normal border-t-4 h-full ${requestStyles}`}
			>
				<div className="p-6 mb-auto">
					<h4 className="font-semibold text-purp-medium pb-4 text-lg uppercase">
						<Icon path={mdiCalendarMonth} size={0.9} className="inline mr-2" />
						Multi-Day Request
					</h4>
					<p className="pb-3">
						<span className="font-semibold">
							{request.employee.firstName} {request.employee.lastName}
						</span>{' '}
						is {request.status === 'approved' ? 'taking' : 'requesting'} off starting{' '}
						<span className="font-semibold">
							{moment(request.startDate.toDate()).format('MMMM DD, YYYY')}
						</span>{' '}
						and ending{' '}
						<span className="font-semibold">
							{moment(request.endDate.toDate()).format('MMMM DD, YYYY')}
						</span>
						<span className="font-semibold">{request.startTime}</span> for a toal of{' '}
						<span className="font-semibold">{request.numberOfHours}</span> hours.
					</p>

					{request.comments && (
						<p>
							Comments: <span className="font-semibold">{request.comments}</span>
						</p>
					)}
				</div>
				{footer ? (
					<div className="bg-purp-lightest px-6 py-3 flex justify-end">
						{request.status === 'pending' ? (
							<button
								className="mr-3 hover:text-red-600 text-purp-medium font-semibold transition duration-200 ease"
								onClick={() => handleDeny(request.id, request.userId, request.numberOfHours)}
							>
								Deny
							</button>
						) : null}
						<ApproveButton
							onClick={() =>
								handleApprove(
									request.id,
									request.userId,
									request.numberOfHours,
									request.employee.firstName,
									request.employee.email,
									request.status
								)
							}
						/>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default MultiRequestShort

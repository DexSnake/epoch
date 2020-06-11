import React, { useState, useContext } from 'react'
import Icon from '@mdi/react'
import { mdiCheckBold, mdiCloseCircleOutline, mdiEyeMinus, mdiEyeCheck, mdiDelete, mdiRestore } from '@mdi/js'
import moment from 'moment'
import { AuthContext } from '../context/Auth'
import DeactivateEmployeeModal from './modals/DeactivateEmployeeModal'
import ReactivateEmployeeModal from './modals/ReactivateEmployeeModal'

const NewEmployeeHeader = ({ data }) => {
	const { currentUser } = useContext(AuthContext)

	const [showDeactivateEmployeeModal, setShowDeactivateEmployeeModal] = useState(false)
	const [showReactivateEmployeeModal, setShowReactivateEmployeeModal] = useState(false)
	const [showSsn, setShowSsn] = useState(false)

	// Gets passed to RemoveEmployeeModal component
	const closeDeactivateModal = () => {
		setShowDeactivateEmployeeModal(false)
	}

	// Gets passed to RemoveEmployeeModal component
	const closeReactivateModal = () => {
		setShowReactivateEmployeeModal(false)
	}

	return (
		<React.Fragment>
			<div className="bg-white px-6 pt-8 pb-6 flex">
				<div style={{ minWidth: 128 }}>
					<img src={data.imageUrl} alt="employee headshot" className="rounded-full h-32 w-32 mb-3 border-purp-light border-4" />
				</div>
				<div className="w-full flex">
					<div className="w-1/2 pl-6 pr-3">
						<h1 className="font-thin leading-none text-5xl text-purp-normal">
							{data.firstName} {data.lastName}
						</h1>
						<p className="text-purp-normal my-2 font-semibold">{data.title}</p>
						{data.isActive ? (
							<p className="text-green-400 text-sm font-semibold uppercase">
								<Icon path={mdiCheckBold} size={0.8} className="pb-1 inline" />
								active
							</p>
						) : (
							<p className="text-red-400 text-sm font-semibold uppercase">
								<Icon path={mdiCloseCircleOutline} size={0.8} className="pb-1 inline" />
								inactive
							</p>
						)}
					</div>
					<div className="w-1/4">
						<p className="text-purp-normal mb-3">
							Hired on: <span className="font-semibold">{data.startDate ? moment(data.startDate.toDate()).format('MMMM DD, YYYY') : null}</span>
						</p>
						<p className="text-purp-normal mb-3">
							SSN: <span className={`font-semibold ${showSsn ? 'tracking-widest' : null}`}>{showSsn ? data.ssn : 'XXX-XXX-XXXX'}</span>
							<Icon onClick={() => setShowSsn(!showSsn)} path={showSsn ? mdiEyeMinus : mdiEyeCheck} size={1} color="#414255" className="pb-1 inline ml-2 cursor-pointer" />
						</p>
						<p className="text-purp-normal mb-3">
							DOB: <span className="font-semibold">{data.dateOfBirth ? moment(data.dateOfBirth.toDate()).format('MMMM DD, YYYY') : null}</span>
						</p>
						<p className="text-purp-normal mb-3">
							Salary:{' '}
							<span className="font-semibold">
								${data.salary}
								<span className="text-sm text-purp-normal">{data.salaryRate}</span>
							</span>
						</p>
					</div>
					<div className="w-1/4 flex flex-col justify-between">
						{currentUser.isAdmin ? (
							data.isActive ? (
								<button onClick={() => setShowDeactivateEmployeeModal(true)} className="h-px text-purp-light hover:text-red-600 font-bold uppercase text-xs focus:outline-none transition duration-200 ease">
									Deactivate Employee <Icon path={mdiDelete} size={0.8} className="inline pb-1" />
								</button>
							) : (
								<button onClick={() => setShowReactivateEmployeeModal(true)} className="h-px text-purp-light hover:text-green-600 font-bold uppercase text-xs focus:outline-none transition duration-200 ease">
									Reactivate Employee <Icon path={mdiRestore} size={0.8} className="inline pb-1" />
								</button>
							)
						) : null}
					</div>
				</div>
			</div>

			{showDeactivateEmployeeModal ? <DeactivateEmployeeModal closeModal={closeDeactivateModal} data={{ id: data.id, firstName: data.firstName, lastName: data.lastName }} /> : null}
			{showReactivateEmployeeModal ? <ReactivateEmployeeModal closeModal={closeReactivateModal} data={{ id: data.id }} /> : null}
		</React.Fragment>
	)
}

export default NewEmployeeHeader

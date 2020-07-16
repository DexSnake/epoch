import React, { useState, useContext } from 'react'
import Icon from '@mdi/react'
import { mdiCheckBold, mdiCloseCircleOutline, mdiEyeMinus, mdiEyeCheck, mdiDelete, mdiRestore } from '@mdi/js'
import moment from 'moment'
import { AuthContext } from 'context/Auth'
import DeactivateEmployeeModal from 'components/Modals/DeactivateEmployeeModal'
import ReactivateEmployeeModal from 'components/Modals/ReactivateEmployeeModal'

const NewEmployeeHeader = () => {
	const { currentUser, employeeProfile } = useContext(AuthContext)

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

	const getInitals = (first, last) => {
		const fullName = `${first} ${last}`
		const matches = fullName.match(/\b(\w)/g)
		const initals = matches.join('')
		return initals
	}

	return (
		<React.Fragment>
			<div className="bg-white px-6 pt-8 pb-6 flex">
				<div className="w-full flex flex-wrap relative">
					<div className="w-full lg:w-1/2 px-3 flex">
						<div className="min-w-profile-pic mr-4">
							{employeeProfile.imageUrl ? (
								<img
									src={employeeProfile.imageUrl}
									alt="employee headshot"
									className="rounded-full h-24 w-24 md:h-32 md:w-32 mb-3 border-purp-light border-4"
								/>
							) : (
								<div className="rounded-full bg-purp-light h-32 w-32 mb-3 flex items-center justify-center mx-auto">
									<span className="text-4xl text-purp-normal">
										{getInitals(employeeProfile.firstName, employeeProfile.lastName)}
									</span>
								</div>
							)}
						</div>
						<div>
							<h1 className="font-thin leading-none text-4xl md:text-5xl text-purp-normal">
								{employeeProfile.firstName} {employeeProfile.lastName}
							</h1>
							<p className="text-purp-normal my-2 font-semibold">{employeeProfile.title}</p>
							{employeeProfile.isActive ? (
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
					</div>
					<div className="w-1/2 px-3 hidden lg:block">
						<p className="text-purp-normal mb-3">
							Hired on:{' '}
							<span className="font-semibold">
								{employeeProfile.startDate
									? moment(employeeProfile.startDate).format('MMMM DD, YYYY')
									: null}
							</span>
						</p>
						<p className="text-purp-normal mb-3">
							SSN:{' '}
							<span className={`font-semibold ${showSsn ? 'tracking-widest' : null}`}>
								{showSsn ? employeeProfile.ssn : 'XXX-XXX-XXXX'}
							</span>
							<Icon
								onClick={() => setShowSsn(!showSsn)}
								path={showSsn ? mdiEyeMinus : mdiEyeCheck}
								size={1}
								color="#414255"
								className="pb-1 inline ml-2 cursor-pointer"
							/>
						</p>
						<p className="text-purp-normal mb-3">
							DOB:{' '}
							<span className="font-semibold">
								{employeeProfile.dateOfBirth
									? moment(employeeProfile.dateOfBirth).format('MMMM DD, YYYY')
									: null}
							</span>
						</p>
						<p className="text-purp-normal mb-3">
							Salary:{' '}
							<span className="font-semibold">
								${employeeProfile.salary}
								<span className="text-sm text-purp-normal">{employeeProfile.salaryRate}</span>
							</span>
						</p>
					</div>
					<div className="absolute top-neg-20 lg:top-0 right-0">
						{currentUser.accessLevel > 0 ? (
							employeeProfile.isActive ? (
								<button
									onClick={() => setShowDeactivateEmployeeModal(true)}
									className="text-purp-light hover:text-red-600 font-bold uppercase text-xs focus:outline-none transition duration-200 ease"
								>
									<Icon path={mdiDelete} size={1} />
								</button>
							) : (
								<button
									onClick={() => setShowReactivateEmployeeModal(true)}
									className="text-purp-light hover:text-green-600 font-bold uppercase text-xs focus:outline-none transition duration-200 ease"
								>
									Reactivate Employee <Icon path={mdiRestore} size={0.8} className="inline pb-1" />
								</button>
							)
						) : null}
					</div>
				</div>
			</div>

			{showDeactivateEmployeeModal ? (
				<DeactivateEmployeeModal
					closeModal={closeDeactivateModal}
					data={{
						id: employeeProfile.id,
						firstName: employeeProfile.firstName,
						lastName: employeeProfile.lastName
					}}
				/>
			) : null}
			{showReactivateEmployeeModal ? (
				<ReactivateEmployeeModal closeModal={closeReactivateModal} data={{ id: employeeProfile.id }} />
			) : null}
		</React.Fragment>
	)
}

export default NewEmployeeHeader

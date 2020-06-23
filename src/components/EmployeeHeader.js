import React, { useContext } from 'react'
import Icon from '@mdi/react'
import { mdiEyeCheck, mdiEyeMinus, mdiDelete, mdiCameraOutline } from '@mdi/js'
import moment from 'moment'
import { AuthContext } from '../context/Auth'

const EmployeeHeader = ({ data, handleFile, showModal, showSsn }) => {
	const { currentUser } = useContext(AuthContext)
	return (
		<div className="bg-white pb-6 pt-8 px-8 flex">
			<div className="w-40 mx-2 relative">
				{data.imageUrl ? (
					<img src={data.imageUrl} alt="employee headshot" className="rounded-full h-32 w-32 mb-3 border-purp-light border-4" />
				) : (
					<div className="rounded-full bg-purp-light h-32 w-32 mb-3 flex items-center justify-center">
						<span className="font-semibold text-2xl text-purp-normal">
							{data.firstName.charAt(0)}
							{data.lastName.charAt(0)}
						</span>
					</div>
				)}
				<div className="absolute" style={{ bottom: 50, right: 50 }}>
					<div className="relative">
						<label htmlFor="profileImage" className="text-purp-normal absolute flex items-center justify-center shadow left-0 top-0 h-8 w-8 bg-white hover:text-purp-lightest rounded-full">
							<Icon path={mdiCameraOutline} size={0.8} style={{ marginTop: 2 }} />
						</label>
						<input type="file" onChange={handleFile} name="profileImage" className="cursor-pointer opacity-0 absolute left-0 top-0 w-6" />
					</div>
				</div>
			</div>
			<div className="w-full mx-2 flex">
				<div className="w-1/2">
					<h1 className="font-thin leading-none text-5xl text-purp-normal">
						{data.firstName} {data.lastName}
					</h1>
					<p className="text-purp-normal mt-2 font-semibold">{data.title}</p>
				</div>
				<div className="w-1/4">
					<p className="text-purp-normal mb-3">
						Hired on: <span className="font-semibold">{data.startDate ? moment(data.startDate).format('MMMM DD, YYYY') : null}</span>
					</p>
					<p className="text-purp-normal mb-3">
						SSN: <span className={`font-semibold ${data.showSsn ? 'tracking-widest' : null}`}>{data.showSsn ? data.ssn : 'XXX-XXX-XXXX'}</span>
						<Icon onClick={showSsn} path={data.showSsn ? mdiEyeMinus : mdiEyeCheck} size={1} color="#414255" className="pb-1 inline ml-2 cursor-pointer" />
					</p>
					<p className="text-purp-normal mb-3">
						DOB:
						<span className="font-semibold">
							{data.dateOfBirth ? moment(data.dateOfBirth).format('MMMM DD, YYYY') : null} ({moment().diff(moment(data.dateOfBirth), 'years')})
						</span>
					</p>
					<p className="text-purp-normal mb-3">
						Salary:{' '}
						<span className="font-semibold">
							${data.salary}
							<span className="text-sm text-purp-normal">{data.salaryRate}</span>
						</span>
					</p>
				</div>
				{currentUser.accessLevel > 0 ? (
					<div className="w-1/4 flex justify-end">
						<button onClick={showModal} className="h-px text-purp-light hover:text-red-600 font-bold uppercase text-xs focus:outline-none transition duration-200 ease">
							Deactivate Employee <Icon path={mdiDelete} size={0.8} className="inline pb-1" />
						</button>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default EmployeeHeader

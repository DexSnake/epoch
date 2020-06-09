import React, { useState } from 'react'
import Icon from '@mdi/react'
import { mdiCheckBold, mdiCloseCircleOutline, mdiEyeMinus, mdiEyeCheck } from '@mdi/js'
import moment from 'moment'

const NewEmployeeHeader = ({ data }) => {
	const [showSsn, setShowSsn] = useState(false)

	return (
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
				<div className="w-1/2">
					<p className="text-purp-normal mb-3">
						Hired on: <span className="font-semibold"></span>
					</p>
					<p className="text-purp-normal mb-3">
						SSN: <span className={`font-semibold ${showSsn ? 'tracking-widest' : null}`}>{showSsn ? data.ssn : 'XXX-XXX-XXXX'}</span>
						<Icon onClick={() => setShowSsn(!showSsn)} path={showSsn ? mdiEyeMinus : mdiEyeCheck} size={1} color="#414255" className="pb-1 inline ml-2 cursor-pointer" />
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
			</div>
		</div>
	)
}

export default NewEmployeeHeader

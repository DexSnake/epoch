import React, { useState } from 'react'
import PTO from './Edit Employee/PTO'

const EditEmployeeNav = ({ data }) => {
	const [openTab, setOpenTab] = useState(1)
	return (
		<React.Fragment>
			<div className="bg-white px-6 py-6 flex border-t">
				<button onClick={() => setOpenTab(1)} className="px-6">
					<span className={`${openTab === 1 ? 'border-b-2' : 'hover:text-purp-medium'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase`}>Time Off</span>
				</button>
				<button onClick={() => setOpenTab(2)} className="px-6">
					<span className={`${openTab === 2 ? 'border-b-2' : 'hover:text-purp-medium'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase`}>Personal Info</span>
				</button>
				<button className="px-6">
					<span className="border-purp-brightest font-semibold text-purp-normal hover:text-purp-medium pb-6 tracking-wider uppercase">Employment Info</span>
				</button>
				<button className="px-6">
					<span className="border-purp-brightest font-semibold text-purp-normal hover:text-purp-medium pb-6 tracking-wider uppercase">Contact Info</span>
				</button>
				<button className="px-6">
					<span className="border-purp-brightest font-semibold text-purp-normal hover:text-purp-medium pb-6 tracking-wider uppercase">Emergency Contacts</span>
				</button>
				<button className="px-6">
					<span className="border-purp-brightest font-semibold text-purp-normal hover:text-purp-medium pb-6 tracking-wider uppercase">Documents</span>
				</button>
			</div>
			<div className={openTab === 1 ? 'block' : 'hidden'}></div>
			<div className={openTab === 2 ? 'block' : 'hidden'}>
				<p>personal</p>
			</div>
		</React.Fragment>
	)
}

export default EditEmployeeNav

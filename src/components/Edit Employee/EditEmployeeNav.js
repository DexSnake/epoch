import React, { useState } from 'react'
import TimeOff from './TimeOff'
import Personal from './Personal'
import Employment from './Employment'
import Contact from './Contact'
import EmergencyContacts from './EmergencyContacts'

const EditEmployeeNav = () => {
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
				<button onClick={() => setOpenTab(3)} className="px-6">
					<span className={`${openTab === 3 ? 'border-b-2' : 'hover:text-purp-medium'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase`}>Employment Info</span>
				</button>
				<button onClick={() => setOpenTab(4)} className="px-6">
					<span className={`${openTab === 4 ? 'border-b-2' : 'hover:text-purp-medium'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase`}>Contact Info</span>
				</button>
				<button onClick={() => setOpenTab(5)} className="px-6">
					<span className={`${openTab === 5 ? 'border-b-2' : 'hover:text-purp-medium'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase`}>Emergency Contacts</span>
				</button>
				<button onClick={() => setOpenTab(6)} className="px-6">
					<span className={`${openTab === 6 ? 'border-b-2' : 'hover:text-purp-medium'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase`}>Documents</span>
				</button>
			</div>
			<div className={openTab === 1 ? 'block' : 'hidden'}>
				<TimeOff />
			</div>
			<div className={openTab === 2 ? 'block' : 'hidden'}>
				<Personal />
			</div>
			<div className={openTab === 3 ? 'block' : 'hidden'}>
				<Employment />
			</div>
			<div className={openTab === 4 ? 'block' : 'hidden'}>
				<Contact />
			</div>
			<div className={openTab === 5 ? 'block' : 'hidden'}>
				<EmergencyContacts />
			</div>
			<div className={openTab === 6 ? 'block' : 'hidden'}>
				<p>Documents</p>
			</div>
		</React.Fragment>
	)
}

export default EditEmployeeNav

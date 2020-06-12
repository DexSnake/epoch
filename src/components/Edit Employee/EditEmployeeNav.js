import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import TimeOff from './TimeOff'
import Personal from './Personal'
import Employment from './Employment'
import Contact from './Contact'
import EmergencyContacts from './EmergencyContacts'
import Update from './Update'
import Requests from './Requests'

const EditEmployeeNav = () => {
	const { currentUser } = useContext(AuthContext)

	const [openTab, setOpenTab] = useState(1)
	return (
		<React.Fragment>
			<div className="bg-white px-6 py-4 justify-between flex border-t">
				<div className="flex">
					<button onClick={() => setOpenTab(1)} className="px-6">
						<span className={`${openTab === 1 ? 'border-b-2 text-purp-brightest' : 'hover:text-purp-brightest'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase transition duration-200 ease-in-out`}>Time Off</span>
					</button>
					<button onClick={() => setOpenTab(2)} className="px-6">
						<span className={`${openTab === 2 ? 'border-b-2 text-purp-brightest' : 'hover:text-purp-brightest'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase transition duration-200 ease-in-out`}>Personal</span>
					</button>
					<button onClick={() => setOpenTab(3)} className="px-6">
						<span className={`${openTab === 3 ? 'border-b-2 text-purp-brightest' : 'hover:text-purp-brightest'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase transition duration-200 ease-in-out`}>Employment</span>
					</button>
					<button onClick={() => setOpenTab(4)} className="px-6">
						<span className={`${openTab === 4 ? 'border-b-2 text-purp-brightest' : 'hover:text-purp-brightest'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase transition duration-200 ease-in-out`}>Contact</span>
					</button>
					<button onClick={() => setOpenTab(5)} className="px-6">
						<span className={`${openTab === 5 ? 'border-b-2 text-purp-brightest' : 'hover:text-purp-brightest'} border-purp-brightest font-semibold text-purp-normal pb-6 tracking-wider uppercase transition duration-200 ease-in-out`}>Documents</span>
					</button>
				</div>
				<div>
					<Update />
				</div>
			</div>
			<div className={openTab === 1 ? 'block' : 'hidden'}>
				<TimeOff />
				{currentUser.isAdmin ? <Requests /> : null}
			</div>
			<div className={openTab === 2 ? 'block' : 'hidden'}>
				<Personal />
				<EmergencyContacts />
			</div>
			<div className={openTab === 3 ? 'block' : 'hidden'}>
				<Employment />
			</div>
			<div className={openTab === 4 ? 'block' : 'hidden'}>
				<Contact />
			</div>
			<div className={openTab === 5 ? 'block' : 'hidden'}>
				<p>Documents</p>
			</div>
		</React.Fragment>
	)
}

export default EditEmployeeNav

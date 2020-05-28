import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiAccountPlusOutline, mdiCalendarCheck } from '@mdi/js'
import DashboardButton from './DashboardButton'
import Layout from './Layout'
import { AuthContext } from '../context/Auth'

const Dashboard = () => {
	const { currentUser, userProfile } = useContext(AuthContext)

	return (
		<Layout>
			<div className="flex flex-wrap mx-10 my-10">
				{userProfile.isAdmin ? (
					<div className="w-1/4">
						<DashboardButton icon={mdiAccountPlusOutline} />
					</div>
				) : null}
				<div className="w-1/4">
					{!userProfile.isAdmin ? (
						<Link to="/new-request">
							<button className="group w-full bg-white h-40 flex items-center justify-center flex-col focus:outline-none hover:shadow transition duration-200 ease">
								<Icon path={mdiCalendarCheck} size={3} color="#414255" className="opacity-25 group-hover:opacity-100 transition duration-200 ease-in-out" />
								<span className="text-purp-normal opacity-25 group-hover:opacity-100 transition duration-200 ease">Submit New Request</span>
							</button>
						</Link>
					) : null}
				</div>
			</div>
		</Layout>
	)
}

export default Dashboard

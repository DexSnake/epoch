import React from 'react'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'

const DashboardButton = ({ link, icon, text }) => {
	return (
		<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 pb-6">
			<Link to={link}>
				<button className="group w-full bg-white h-40 flex items-center justify-center flex-col focus:outline-none hover:shadow transition duration-200 ease">
					<Icon
						path={icon}
						size={3}
						color="#414255"
						className="opacity-25 group-hover:opacity-100 transition duration-200 ease-in-out"
					/>
					<span className="text-purp-normal opacity-25 group-hover:opacity-100 transition duration-200 ease">
						{text}
					</span>
				</button>
			</Link>
		</div>
	)
}

export default DashboardButton

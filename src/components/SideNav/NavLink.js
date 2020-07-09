import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'

const NavLink = ({ linkTo, icon, text }) => {
	return (
		<Link to={`/${linkTo}`} className="focus:outline-none cursor-pointer">
			<li className="text-purp-light py-2 pl-6 pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
				<Icon path={icon} size={0.8} className="mr-2" />
				{text}
			</li>
		</Link>
	)
}

export default NavLink

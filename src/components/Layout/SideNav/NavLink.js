import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'

const NavLink = ({ linkTo, icon, text }) => {
	return (
		<Link to={`/${linkTo}`} className="focus:outline-none cursor-pointer">
			<li className="text-purp-light md:py-2 md:pl-6 md:pr-8 focus:outline-none hover:bg-purp-dark flex items-center">
				<Icon path={icon} size={0.8} className="md:mr-2" />
				<span className="hidden md:inline">{text}</span>
			</li>
		</Link>
	)
}

export default NavLink

import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'

const AccountNavLink = ({ linkTo, icon, text }) => {
	return (
		<Link to={`/${linkTo}`}>
			<li className="text-purp-light hover:text-white focus:outline-none py-1 px-4 hover:bg-purp-dark flex items-center">
				<Icon path={icon} size={0.8} className="mr-1" />
				{text}
			</li>
		</Link>
	)
}

export default AccountNavLink

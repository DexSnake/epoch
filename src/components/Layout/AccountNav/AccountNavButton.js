import React from 'react'
import Icon from '@mdi/react'

const AccountNavButton = ({ onClick, icon, text }) => {
	return (
		<li className="text-purp-light hover:text-white focus:outline-none py-1 px-4 hover:bg-purp-dark flex items-center">
			<button onClick={onClick}>
				<Icon path={icon} size={0.8} className="mr-1 inline" />
				{text}
			</button>
		</li>
	)
}

export default AccountNavButton

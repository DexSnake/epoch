import React from 'react'

const EditEmployeeInfoLabel = (props) => (
	<label htmlFor={props.htmlFor} className={`text-purp-medium text-sm font-semibold uppercase ${props.className}`}>
		{props.name}
	</label>
)

export default EditEmployeeInfoLabel

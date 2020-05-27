import React from 'react'

export const TextInput = (props) => <input type="text" name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} className="w-full text-purp-normal border-b pb-1 px-2" />
export const Select = (props) => (
	<select name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} className="w-full text-purp-normal border-b pb-1 px-2 appearance-none">
		{props.children}
	</select>
)

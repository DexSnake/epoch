import React from 'react'

export const Label = (props) => (
	<label htmlFor={props.htmlFor} className={`text-purp-medium text-sm font-semibold uppercase ${props.className}`}>
		{props.name}
	</label>
)

export const TextInput = (props) => (
	<input
		type="text"
		name={props.name}
		disabled={props.disabled ? true : false}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		className={`w-full text-purp-normal border-b pb-1 px-2 disabled:bg-white ${props.className}`}
	/>
)
export const PasswordInput = (props) => (
	<input
		type="password"
		name={props.name}
		disabled={props.disabled ? true : false}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		className={`w-full text-purp-normal border-b pb-1 px-2 disabled:bg-white ${props.className}`}
	/>
)
export const Select = (props) => (
	<select name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} className="w-full text-purp-normal border-b pb-1 px-2 appearance-none">
		{props.children}
	</select>
)

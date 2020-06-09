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
		className={`w-full text-purp-normal border-b pb-1 focus:outline-none focus:border-purp-bright px-2 disabled:bg-white disabled:text-purp-medium ${props.className}`}
	/>
)
export const EmailInput = (props) => (
	<input
		type="email"
		name={props.name}
		disabled={props.disabled ? true : false}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		className={`w-full text-purp-normal border-b pb-1 focus:outline-none focus:border-purp-bright px-2 disabled:bg-white disabled:text-purp-medium ${props.className}`}
	/>
)
export const NumberInput = (props) => (
	<input
		type="number"
		name={props.name}
		min={props.min}
		max={props.max}
		step={props.step}
		disabled={props.disabled ? true : false}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		className={`w-full text-purp-normal focus:outline-none focus:border-purp-bright border-b pb-1 px-2 disabled:bg-white ${props.className}`}
	/>
)
export const DateInput = (props) => (
	<input type="date" name={props.name} value={props.value} disabled={props.disabled ? true : false} onChange={props.onChange} className={`w-full text-purp-normal focus:outline-none border-b pb-1 px-2 disabled:bg-white ${props.className}`} />
)

export const PasswordInput = (props) => (
	<input
		type="password"
		name={props.name}
		disabled={props.disabled ? true : false}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		className={`w-full text-purp-normal focus:outline-none focus:border-purp-bright border-b pb-1 px-2 disabled:bg-white ${props.className}`}
	/>
)
export const TextArea = (props) => (
	<textarea
		name={props.name}
		rows={props.rows}
		cols={props.cols}
		disabled={props.disabled ? true : false}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		className={`w-full text-purp-normal focus:outline-none focus:border-purp-bright border-b pb-1 px-2 disabled:bg-white ${props.className}`}
	/>
)
export const Select = (props) => (
	<select name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} disabled={props.disabled} className="w-full text-purp-normal focus:outline-none border-b pb-1 px-2 appearance-none disabled:text-purp-medium">
		{props.children}
	</select>
)

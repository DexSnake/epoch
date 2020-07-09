import React from 'react'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

export const SubmitButtonWithLoader = ({ loading, text, loadingText, fullWidth, className, onClick, color, size }) => {
	let buttonColor
	if (color === 'green') {
		buttonColor = 'bg-green-500'
	} else if (color === 'red') {
		buttonColor = 'bg-red-500'
	} else {
		buttonColor = 'bg-purp-brightest'
	}

	let buttonSize
	if (size === 'xs') {
		buttonSize = 'text-xs'
	} else if (size === 'sm') {
		buttonSize = 'text-sm'
	} else if (size === 'lg') {
		buttonSize = 'text-lg'
	} else {
		buttonSize = 'text-base'
	}

	return (
		<button
			type="submit"
			disabled={loading}
			onClick={onClick}
			className={`relative ${
				fullWidth ? 'w-full' : null
			} rounded flex justify-center ${buttonColor} ${buttonSize} hover:opacity-75 text-white block px-4 py-2 font-semibold text-center transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed disabled:pr-16 ${className}`}
		>
			{loading ? (
				<>
					<Icon
						path={mdiLoading}
						size={size === 'xs' ? 0.8 : 1}
						spin={(true, 1)}
						className="absolute right-20"
					/>
					<span>{loadingText}</span>
				</>
			) : (
				text
			)}
		</button>
	)
}

SubmitButtonWithLoader.defaultProps = {
	color: 'purple',
	size: 'md',
	text: 'Button',
	loadingText: 'Loading...',
	loading: false,
	fullWidth: false
}

export const DeleteButton = ({ loading, text, loadingText, className, onClick, size }) => {
	let buttonSize
	if (size === 'xs') {
		buttonSize = 'text-xs'
	} else if (size === 'sm') {
		buttonSize = 'text-sm'
	} else if (size === 'lg') {
		buttonSize = 'text-lg'
	} else {
		buttonSize = 'text-base'
	}

	return (
		<button
			type="submit"
			disabled={loading}
			onClick={onClick}
			className={`relative rounded flex justify-center ${buttonSize} hover:opacity-75 text-red-500 block font-semibold text-center transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed disabled:pr-10 ${className}`}
		>
			{loading ? (
				<>
					<Icon
						path={mdiLoading}
						size={size === 'xs' ? 0.8 : 1}
						spin={(true, 1)}
						className="absolute right-20"
					/>
					<span>{loadingText}</span>
				</>
			) : (
				text
			)}
		</button>
	)
}

DeleteButton.defaultProps = {
	size: 'md',
	text: 'Delete',
	loadingText: 'Deleting...',
	loading: false
}

export const ApproveButton = ({ text, onClick }) => {
	return (
		<button
			className="bg-green-500 hover:bg-green-700 text-white font-semibold text-sm rounded px-3 py-2 transition duration-200 ease"
			onClick={onClick}
		>
			{text}
		</button>
	)
}

ApproveButton.defaultProps = {
	text: 'Approve'
}

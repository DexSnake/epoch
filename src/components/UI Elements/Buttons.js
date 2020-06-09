import React from 'react'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

export const SubmitButtonWithLoader = ({ loading, text, loadingText, fullWidth, className, onClick }) => {
	return (
		<button
			type="submit"
			disabled={loading}
			onClick={onClick}
			className={`relative ${
				fullWidth ? 'w-full' : null
			} rounded flex justify-center mt-6 bg-purp-brightest hover:bg-purp-bright text-white block px-6 py-2 font-semibold text-center transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed disabled:pr-16 ${className}`}>
			{loading ? (
				<>
					<Icon path={mdiLoading} size={1} spin={(true, 1)} className="absolute right-20" />
					<span>{loadingText}</span>
				</>
			) : (
				text
			)}
		</button>
	)
}

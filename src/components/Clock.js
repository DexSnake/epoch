import React, { useState, useEffect } from 'react'

export const Clock = () => {
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		setInterval(tick, 1000)
	}, [])

	const tick = () => {
		setDate(new Date())
	}

	return <span className="text-6xl font-thin text-purp-normal">{date.toLocaleTimeString()}</span>
}

import React from 'react'
import { Link } from 'react-router-dom'

const Employee = ({ employees }) => {
	return employees.map((e) => {
		return (
			<div key={e.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 pb-6">
				<div className="flex flex-col items-center text-center p-4 bg-white shadow-lg">
					{e.imageUrl ? (
						<img src={e.imageUrl} alt="employee headshot" className="rounded-full h-24 w-24 mb-3" />
					) : (
						<div className="rounded-full bg-purp-light h-24 w-24 mb-3 flex items-center justify-center">
							<span className="font-semibold text-2xl">
								{e.firstName.charAt(0)}
								{e.lastName.charAt(0)}
							</span>
						</div>
					)}
					<Link
						to={{
							pathname: `/employees/edit/${e.id}`,
							state: { data: e },
						}}>
						<h5 className="font-semibold text-purp-normal">
							{e.firstName} {e.middleName ? `${e.middleName.charAt(0)}.` : null} {e.lastName}
						</h5>
						<p>{e.title}</p>
					</Link>
				</div>
			</div>
		)
	})
}

export default Employee

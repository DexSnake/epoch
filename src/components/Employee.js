import React from 'react'
import { Link } from 'react-router-dom'

const Employee = ({ employees, requests }) => {
	return employees.map((e) => {
		return (
			<div key={e.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 pb-6">
				<div className="flex flex-col items-center rounded text-center p-4 bg-white shadow-lg relative">
					<Link
						to={{
							pathname: `/employees/edit/${e.id}`,
							state: { id: e.id },
						}}>
						{e.imageUrl ? (
							<img src={e.imageUrl} alt="employee headshot" className="rounded-full h-24 w-24 mb-3 mx-auto" />
						) : (
							<div className="rounded-full bg-purp-light h-24 w-24 mb-3 flex items-center justify-center mx-auto">
								<span className="text-purp-normal text-2xl">
									{e.firstName.charAt(0)}
									{e.lastName.charAt(0)}
								</span>
							</div>
						)}
						<h5 className="font-semibold text-xl text-purp-normal">
							{e.firstName} {e.middleName ? `${e.middleName.charAt(0)}.` : null} {e.lastName}
						</h5>
						<p className="text-purp-normal">{e.title}</p>
					</Link>
					{requests.filter((r) => r.userId === e.id).filter((r) => r.status === 'pending').length > 0 ? (
						<p className="font-semibold top-20 right-20 absolute h-8 w-8 bg-red-600 text-white flex items-center justify-center rounded-full">{requests.filter((r) => r.userId === e.id).filter((r) => r.status === 'pending').length}</p>
					) : null}
				</div>
			</div>
		)
	})
}

export default Employee

import React from 'react'
import { Link } from 'react-router-dom'

const Employee = ({ data, requests, inactive }) => {
	return (
		<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 pb-6">
			<div
				className={`flex flex-col items-center rounded text-center p-4 bg-white shadow-lg hover:shadow-xl transition duration-200 ease relative ${
					inactive ? 'opacity-50' : 'opacity-100'
				}`}
			>
				<Link
					to={{
						pathname: `/employee/edit/${data.id}`,
						state: { id: data.id }
					}}
				>
					{data.imageUrl ? (
						<img
							src={data.imageUrl}
							alt="employee headshot"
							className="rounded-full h-24 w-24 mb-3 mx-auto"
						/>
					) : (
						<div className="rounded-full bg-purp-light h-24 w-24 mb-3 flex items-center justify-center mx-auto">
							<span className="text-purp-normal text-2xl">
								{data.firstName.charAt(0)}
								{data.lastName.charAt(0)}
							</span>
						</div>
					)}
					<h5 className="font-semibold text-xl text-purp-normal">
						{data.firstName} {data.middleName ? `${data.middleName.charAt(0)}.` : null} {data.lastName}
					</h5>
					<p className="text-purp-normal">{data.title}</p>
				</Link>
				{requests
					.filter((request) => request.userId === data.id)
					.filter((request) => request.status === 'pending').length > 0 ? (
					<p className="font-semibold top-20 right-20 absolute h-8 w-8 bg-red-600 text-white flex items-center justify-center rounded-full">
						{
							requests
								.filter((request) => request.userId === data.id)
								.filter((request) => request.status === 'pending').length
						}
					</p>
				) : null}
			</div>
		</div>
	)
}

export default Employee

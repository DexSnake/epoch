import React from 'react'
import Skeleton from 'react-loading-skeleton'

const UserRequest = () => {
	return (
		<div className="p-6 bg-white shadow rounded mb-3 border-l-4">
			<div className="flex">
				<div className="w-1/4 px-3">
					<Skeleton height={25} width={150} />
				</div>
				<div className="w-1/4 px-3">
					<Skeleton height={25} width={150} />
				</div>
				<div className="w-1/4 px-3">
					<Skeleton height={25} width={150} />
				</div>
				<div className="w-1/4 px-3">
					<Skeleton height={25} width={150} />
				</div>
			</div>
			<div className="flex relative">
				<div className="w-1/4 px-3">
					<Skeleton width={175} />
				</div>
				<div className="w-1/4 px-3">
					<Skeleton width={175} />
				</div>
				<div className="w-1/4 px-3">
					<Skeleton width={175} />
				</div>
				<div className="w-1/4 px-3">
					<Skeleton width={175} />
				</div>
			</div>
		</div>
	)
}

export default UserRequest

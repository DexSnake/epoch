import React from 'react'
import Skeleton from 'react-loading-skeleton'

const UserRequestShort = () => {
	return (
		<div className="w-1/3 px-3">
			<div className="bg-white shadow-lg rounded mb-3 text-purp-normal border-t-4">
				<div className="p-6">
					<div className="pb-4">
						<Skeleton width={175} height={25} />
					</div>
					<Skeleton count={3} />
					<div className="pt-4">
						<Skeleton />
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserRequestShort

import React from 'react'
import Skeleton from 'react-loading-skeleton'

const RequestForm = () => {
	return (
		<div className="flex justify-center m-10">
			<div className="w-full max-w-sm bg-white p-6">
				<div className="w-full mb-5 px-3">
					<Skeleton height={40} />
				</div>
				<div className="flex flex-wrap">
					<div className="w-1/2 px-3 mb-5">
						<Skeleton height={20} />
					</div>
					<div className="w-1/2 px-3 mb-5">
						<Skeleton height={20} />
					</div>
					<div className="w-full mb-5 px-3">
						<Skeleton height={300} />
					</div>
					<div className="w-full mb-5 px-3">
						<Skeleton height={20} />
					</div>
					<div className="w-full mb-5 px-3">
						<Skeleton height={75} />
					</div>
					<div className="w-full px-3">
						<Skeleton width={150} height={40} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default RequestForm

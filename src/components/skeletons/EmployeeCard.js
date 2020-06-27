import React from 'react'
import Skeleton from 'react-loading-skeleton'

const EmployeeCard = () => {
	return (
		<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 pb-6">
			<div className="rounded text-center p-4 bg-white shadow-lg">
				<Skeleton height={96} width={96} circle />
				<div className="mt-2">
					<Skeleton width={170} height={20} />
					<Skeleton width={120} />
				</div>
			</div>
		</div>
	)
}

export default EmployeeCard

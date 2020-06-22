import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonRow = () => {
	return (
		<tr className="bg-white hover:bg-purp-lightest">
			<td className="pl-2 py-2 flex">
				<Skeleton circle={true} height={40} width={40} />
			</td>
			<td>
				<Skeleton width={80} />
			</td>
			<td>
				<Skeleton width={150} />
			</td>
			<td>
				<Skeleton width={70} height={35} />
				<span className="mr-4"></span>
				<Skeleton width={70} height={35} />
			</td>
		</tr>
	)
}

export default SkeletonRow

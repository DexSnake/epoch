import React, { useEffect, useState } from 'react'
import SkeletonRow from './SkeletonRow'
import { functions } from '../../firebase/firebase'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Users = ({ currentUser }) => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const getAllUsers = functions.httpsCallable('getAllUsers')
	const removeUser = functions.httpsCallable('removeUser')

	useEffect(() => {
		getAllUsers().then((result) => {
			setUsers(result.data.users)
		})
	}, [])

	const handleDelte = (uid) => {
		setLoading(true)
		removeUser({ uid })
			.then(() => {
				getAllUsers().then((result) => {
					setUsers(result.data.users)
				})
				setLoading(false)
				toast.success('User Deleted')
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
			})
	}
	return (
		<React.Fragment>
			<table className="w-full rounded shadow text-purp-normal">
				<thead>
					<tr className="bg-purp-light">
						<th className="text-left py-2 pl-2">User</th>
						<th className="text-left py-2">Role</th>
						<th className="text-left py-2">Last Active</th>
						<th className="text-left py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 ? (
						users
							.filter((user) => user.customClaims)
							.map((user) => {
								const matches = user.displayName.match(/\b(\w)/g)
								const initials = matches.join('')
								return (
									<tr key={user.uid} className="bg-white hover:bg-purp-lightest">
										<td className="pl-2 py-2 flex flex items-center">
											{user.photoURL ? (
												<img src={user.photoURL} alt="user profile image" className="h-10 w-10 rounded-full ml-2" />
											) : (
												<span className="h-10 w-10 rounded-full ml-2 bg-purp-medium flex justify-center items-center text-sm text-purp-normal">{initials}</span>
											)}
											<span className="ml-2 font-semibold">{user.displayName}</span>
										</td>
										<td>{user.customClaims ? (user.customClaims.isAdmin ? 'Admin' : 'User') : null}</td>
										<td>{user.metadata.lastSignInTime ? moment(user.metadata.lastSignInTime).fromNow() : <span className="bg-yellow-500 py-1 px-2 text-xs text-white rounded">pending</span>}</td>
										<td>{currentUser.uid === user.uid ? null : <SubmitButtonWithLoader text="Remove User" loadingText="Removing..." loading={loading} onClick={() => handleDelte(user.uid)} color="red" size="xs" />}</td>
									</tr>
								)
							})
					) : (
						<>
							<SkeletonRow />
							<SkeletonRow />
							<SkeletonRow />
							<SkeletonRow />
							<SkeletonRow />
						</>
					)}
				</tbody>
			</table>
			<ToastContainer position="top-center" autoClose={2000} />
		</React.Fragment>
	)
}

export default Users

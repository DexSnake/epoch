import React, { useEffect, useState } from 'react'
import SkeletonRow from './Account/SkeletonRow'
import { functions } from '../firebase/firebase'
import { DeleteButton } from './UI Elements/Buttons'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteUserModal from './modals/DeleteUserModal'
import { Link } from 'react-router-dom'

const UserList = ({ currentUser }) => {
	const [users, setUsers] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [removeUserId, setRemoveUserId] = useState(null)
	const getAllUsers = functions.httpsCallable('getAllUsers')

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = () => {
		getAllUsers().then((result) => {
			setUsers(result.data.users)
		})
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<React.Fragment>
			<table className="w-full rounded shadow text-purp-normal">
				<thead>
					<tr className="bg-purp-light">
						<th className="text-left py-2 pl-2">User</th>
						<th className="text-left py-2">Role</th>
						<th className="text-left py-2">Last Sign-in</th>
						<th className="text-left py-2"></th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 ? (
						users.map((user) => {
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
										<div>
											<p className="ml-2 font-semibold">{user.displayName}</p>
											<p className="ml-2">{user.email}</p>
										</div>
									</td>
									<td>{user.customClaims ? user.customClaims.role : 'Employee'}</td>
									<td>{user.metadata.lastSignInTime ? moment(user.metadata.lastSignInTime).fromNow() : <span className="bg-yellow-500 py-1 px-2 text-xs text-white rounded">pending</span>}</td>
									<td className="">
										{user.customClaims.accessLevel > currentUser.accessLevel ? null : (
											<div className="flex">
												{currentUser.uid === user.uid ? null : (
													<DeleteButton
														text="Remove User"
														loadingText="Removing..."
														onClick={() => {
															setRemoveUserId(user.uid)
															setShowModal(true)
														}}
														size="sm"
													/>
												)}
												<Link
													to={{
														pathname: `/users/edit/${user.uid}`,
														state: { user },
													}}
													className="text-sm text-purp-normal hover:opacity-50 font-semibold ml-3">
													Edit User
												</Link>
											</div>
										)}
									</td>
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
			{showModal ? <DeleteUserModal user={removeUserId} closeModal={closeModal} getUsers={getUsers} /> : null}
		</React.Fragment>
	)
}

export default UserList

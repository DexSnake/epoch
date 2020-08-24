import React, { useEffect, useState } from 'react'
import SkeletonRow from './skeletons/UserTableRow'
import { functions } from '../firebase/firebase'
import { DeleteButton } from './UI Elements/Buttons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteUserModal from './Modals/DeleteUserModal'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiCheckBold, mdiCloseCircleOutline, mdiAccountEdit, mdiDelete } from '@mdi/js'

const UserList = ({ currentUser }) => {
	const [users, setUsers] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [removeUser, setRemoveUser] = useState(null)
	const getAllUsers = functions.httpsCallable('getAllUsers')

	const getUsers = () => {
		getAllUsers().then((result) => {
			setUsers(result.data.users)
		})
	}

	useEffect(() => {
		getUsers()
	}, [])

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<React.Fragment>
			<table className="w-full rounded shadow text-purp-normal">
				<thead>
					<tr className="bg-purp-light">
						<th className="text-left py-2 pl-2">User</th>
						<th className="text-left py-2 hidden md:table-cell">Role</th>
						<th className="text-left py-2 hidden md:table-cell">Status</th>
						<th className="text-left py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 ? (
						users
							.filter((user) => user.customClaims.accessLevel < 3)
							.sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
							.map((user) => {
								const matches = user.displayName.match(/\b(\w)/g)
								const initials = matches.join('')
								return (
									<tr key={user.uid} className="bg-white hover:bg-purp-lightest">
										<td className="pl-2 py-2 flex items-center">
											{user.photoURL ? (
												<img
													src={user.photoURL}
													alt="user profile"
													className="h-10 w-10 rounded-full ml-2"
												/>
											) : (
												<span className="h-10 w-10 rounded-full ml-2 bg-purp-medium flex justify-center items-center text-sm text-purp-normal">
													{initials}
												</span>
											)}
											<div>
												<p className="ml-2 font-semibold">{user.displayName}</p>
												<p className="ml-2">{user.email}</p>
											</div>
										</td>
										<td className="hidden md:table-cell">
											{user.customClaims ? user.customClaims.role : 'Employee'}
										</td>
										<td className="hidden md:table-cell">
											{user.disabled ? (
												<span className="text-red-400 text-sm font-semibold uppercase">
													<Icon
														path={mdiCloseCircleOutline}
														size={0.8}
														className="pb-1 inline"
													/>
													inactive
												</span>
											) : (
												<span className="text-green-400 text-sm font-semibold uppercase">
													<Icon path={mdiCheckBold} size={0.8} className="pb-1 inline" />
													active
												</span>
											)}
										</td>
										<td className="">
											{user.customClaims.accessLevel > currentUser.accessLevel ? null : (
												<div className="flex">
													<Link
														to={{
															pathname: `/user/edit/${user.uid}`,
															state: { user }
														}}
														className="text-sm text-purp-normal hover:opacity-50 font-semibold mr-3"
													>
														<span className="hidden md:table-cell">Edit User</span>
														<Icon
															path={mdiAccountEdit}
															size={1}
															className="table-cell md:hidden"
														/>
													</Link>
													{currentUser.uid === user.uid ? null : (
														<>
															<DeleteButton
																text="Remove User"
																loadingText="Removing..."
																onClick={() => {
																	setRemoveUser(user)
																	setShowModal(true)
																}}
																size="sm"
																className="hidden md:table-cell"
															/>
															<span className="text-red-500">
																<Icon
																	path={mdiDelete}
																	size={1}
																	className="table-cell md:hidden cursor-pointer hover:opacity-75"
																	onClick={() => {
																		setRemoveUser(user)
																		setShowModal(true)
																	}}
																/>
															</span>
														</>
													)}
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
			{showModal ? <DeleteUserModal user={removeUser} closeModal={closeModal} getUsers={getUsers} /> : null}
		</React.Fragment>
	)
}

export default UserList

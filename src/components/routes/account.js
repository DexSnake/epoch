import React, { useContext, useState, useEffect } from 'react'
import Layout from '../Layout'
import { functions } from '../../firebase/firebase'
import ChangePassword from '../Account/ChangePassword'
import CreateAdmin from '../Account/CreateAdmin'
import ChangeProfileImage from '../Account/ChangeProfileImage'
import { AuthContext } from '../../context/Auth'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'

const Account = () => {
	const { currentUser } = useContext(AuthContext)
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
		<Layout>
			<div className="flex flex-wrap m-10">
				<div className="w-1/2 px-3">
					<ChangeProfileImage />
				</div>
				<div className="w-1/2 px-3">
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
							{users
								.filter((user) => user.customClaims)
								.map((user) => {
									const matches = user.displayName.match(/\b(\w)/g)
									const initials = matches.join('')
									return (
										<tr key={user.uid} className="bg-white hover:bg-purp-lightest">
											<td className="pl-2 py-2 flex">
												{user.photoURL ? (
													<img src={user.photoURL} alt="user profile image" className="h-6 w-6 rounded-full ml-2" />
												) : (
													<span className="h-6 w-6 rounded-full ml-2 bg-purp-medium flex justify-center items-center text-xs text-purp-normal">{initials}</span>
												)}
												<span className="ml-2">{user.displayName}</span>
											</td>
											<td>{user.customClaims ? (user.customClaims.isAdmin ? 'Admin' : null) : 'User'}</td>
											<td>{user.metadata.lastSignInTime ? moment(user.metadata.lastSignInTime).fromNow() : <span className="bg-yellow-400 py-1 px-2 text-xs text-white rounded">pending</span>}</td>
											<td>{currentUser.uid === user.uid ? null : <SubmitButtonWithLoader text="Delete" loadingText="Deleting..." loading={loading} onClick={() => handleDelte(user.uid)} color="red" size="xs" />}</td>
										</tr>
									)
								})}
						</tbody>
					</table>
				</div>
			</div>
			<div className="flex flex-wrap m-10">
				<div className="w-1/4 px-3">
					<ChangePassword />
				</div>
				{currentUser.isAdmin ? (
					<div className="w-1/4 px-3">
						<CreateAdmin />
					</div>
				) : null}
			</div>
			<ToastContainer position="top-center" autoClose={2000} />
		</Layout>
	)
}

export default Account

import React, { useState } from 'react'
import { Select, Label } from './FormFields'
import { functions } from '../firebase/firebase'
import { SubmitButtonWithLoader, DeleteButton } from './UI Elements/Buttons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteUserModal from './Modals/DeleteUserModal'

const EditUserDetails = ({ user }) => {
	const [role, setRole] = useState({ name: user.customClaims.role, accessLevel: user.customClaims.accessLevel })
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const setUserPermissions = functions.httpsCallable('setUserPermissions')

	const matches = user.displayName.match(/\b(\w)/g)
	const initials = matches.join('')

	const handleSubmit = () => {
		setLoading(true)
		setUserPermissions({ uid: user.uid, role: role.name, accessLevel: role.accessLevel })
			.then(() => {
				toast.success('User Updated')
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<>
			<div className="w-full bg-white rounded shadow">
				<div className="h-20 sm:h-32 bg-purp-medium"></div>
				<div className="px-6 pb-6 flex flex-col md:flex-row">
					<div className="w-32 -mt-12">
						{user.photoURL ? (
							<div
								className="h-32 w-32 rounded-full border-4 border-white relative"
								alt="profile image"
								style={{ backgroundImage: `url('${user.photoURL}')`, backgroundSize: 'cover' }}
							></div>
						) : (
							<div className="h-32 w-32 rounded-full border-4 border-white bg-purp-light relative flex items-center justify-center">
								<p className="absolute text-3xl">{initials}</p>
							</div>
						)}
					</div>
					<div>
						<h1 className="text-2xl font-semibold ml-4 text-purp-normal">{user.displayName}</h1>
						<h2 className="ml-4 text-purp-normal">{user.email}</h2>
						<div className="ml-4 mt-2">
							<Label name="User Role" htmlFor="userRole" />
							<Select
								name="userRole"
								value={role.name}
								onChange={(e) => {
									if (e.target.value === 'Super Admin') {
										setRole({ name: 'Super Admin', accessLevel: 3 })
									} else if (e.target.value === 'Admin') {
										setRole({ name: 'Admin', accessLevel: 2 })
									} else if (e.target.value === 'Supervisor') {
										setRole({ name: 'Supervisor', accessLevel: 1 })
									} else {
										setRole({ name: 'User', accessLevel: 0 })
									}
								}}
							>
								<option value="User">User</option>
								<option value="Supervisor">Supervisor</option>
								<option value="Admin">Admin</option>
								<option value="Super Admin">Super Admin</option>
							</Select>
						</div>
					</div>
					<div className="w-full flex flex-col justify-end items-end mt-4 md:mt-0">
						<SubmitButtonWithLoader
							onClick={handleSubmit}
							text="Update"
							loadingText="Updating..."
							loading={loading}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-end px-6">
				{user.customClaims.accessLevel > 2 ? null : (
					<DeleteButton
						text="Remove User"
						loadingText="Removing..."
						onClick={() => setShowModal(true)}
						size="sm"
						className="mt-2"
					/>
				)}
			</div>
			{showModal ? <DeleteUserModal user={user.uid} closeModal={closeModal} /> : null}
			<ToastContainer position="top-center" autoClose={2000} />
		</>
	)
}

export default EditUserDetails

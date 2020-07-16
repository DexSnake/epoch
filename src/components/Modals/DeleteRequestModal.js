import React, { useState } from 'react'
import { db } from '../../firebase/firebase'
import { toast } from 'react-toastify'
import { SubmitButtonWithLoader } from '../UI Elements/Buttons'

const DeleteRequestModal = ({ id, request, pto, closeModal, history }) => {
	const [loading, setLoading] = useState(false)

	const handleDelete = (e) => {
		e.preventDefault()
		setLoading(true)
		db.collection('Employees')
			.doc(request.userId)
			.update({
				pto: {
					availableHours:
						request.status === 'pending'
							? pto.availableHours
							: pto.availableHours + parseInt(request.numberOfHours),
					pendingHours:
						request.status === 'pending'
							? pto.pendingHours - parseInt(request.numberOfHours)
							: pto.pendingHours,
					usedHours:
						request.status === 'pending' ? pto.usedHours : pto.usedHours - parseInt(request.numberOfHours)
				}
			})
			.then(() => {
				setLoading(false)
				history.push('/requests')
				db.collection('Requests')
					.doc(id)
					.delete()
					.then(() => {
						toast.success('Request Deleted')
					})
			})

			.catch((error) => {
				setLoading(false)
				toast.error(error.message)
			})
	}

	return (
		<React.Fragment>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div
						className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none"
						style={{ maxHeight: '80vh' }}
					>
						<div className="flex items-start p-5 rounded-t bg-purp-lightest">
							<h3 className="text-2xl text-purp-normal">Delete Request?</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-4xl leading-none outline-none focus:outline-none"
								onClick={closeModal}
							>
								<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
									×
								</span>
							</button>
						</div>
						<div className="relative p-6 flex-auto">
							<div className="flex flex-col">
								<p className="font-semibold text-lg mb-2 text-purp-normal">
									Are you sure you want to delete this request?
								</p>
								<p className="text-purp-normal">
									This will permanently delete the request. This action cannot be un-done.
								</p>
							</div>
						</div>
						<div className="flex items-center justify-end px-5 pb-5 rounded-b">
							{loading ? null : (
								<button
									className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease"
									onClick={closeModal}
								>
									Cancel
								</button>
							)}
							<SubmitButtonWithLoader
								onClick={handleDelete}
								text="Delete Request"
								loadingText="Deleting..."
								loading={loading}
								color="red"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</React.Fragment>
	)
}

export default DeleteRequestModal

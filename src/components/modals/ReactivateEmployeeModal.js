import React, { useState } from 'react'
import { db, functions } from '../../firebase/firebase'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

const DeactivateEmployeeModal = ({ data, closeModal, history }) => {
	const [loading, setLoading] = useState(false)
	const enableUser = functions.httpsCallable('enableUser')

	const handleReactivate = () => {
		setLoading(true)
		enableUser({ id: data.id }).then(() => {
			db.collection('Employees')
				.doc(data.id)
				.update({
					isActive: true,
					updatedAt: new Date(),
				})
				.then(() => {
					setLoading(false)
					window.location.reload()
				})
		})
	}

	return (
		<React.Fragment>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none" style={{ maxHeight: '80vh' }}>
						<div className="flex items-start p-5 rounded-t bg-purp-lightest">
							<h3 className="text-2xl text-purp-normal">Reactivate Employee?</h3>
							<button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-4xl leading-none outline-none focus:outline-none" onClick={closeModal}>
								<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
							</button>
						</div>
						<div className="relative p-6 flex-auto">
							<div className="flex flex-col">
								<p>Are you sure you want to reactivate this emplooyee?</p>
							</div>
						</div>
						<div className="flex items-center justify-end px-5 pb-5 rounded-b">
							{loading ? null : (
								<button className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={closeModal}>
									Cancel
								</button>
							)}
							<button type="submit" className="bg-green-600 text-white font-bold uppercase text-sm px-6 py-3 rounded hover:bg-green-400 outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={handleReactivate}>
								{loading ? <Icon path={mdiLoading} size={1} spin={(true, 1)} /> : 'Reactivate'}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</React.Fragment>
	)
}

export default DeactivateEmployeeModal

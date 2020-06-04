import React, { useState, useEffect } from 'react'

const RemoveEmployeeModal = ({ closeModal, handleDelete, firstName, lastName }) => {
	const [confirmDelete, setConfirmDelete] = useState('')
	const [removeButton, setRemoveButton] = useState(true)

	useEffect(() => {
		if (confirmDelete === `${firstName} ${lastName}`) {
			setRemoveButton(false)
		} else {
			setRemoveButton(true)
		}
	}, [confirmDelete, firstName, lastName])

	return (
		<React.Fragment>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white overflow-y-auto outline-none focus:outline-none" style={{ maxHeight: '80vh' }}>
						<div className="flex items-start p-5 rounded-t bg-purp-lightest">
							<h3 className="text-2xl text-purp-normal">Remove Employee?</h3>
							<button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition duration-300 ease transform hover:rotate-45" onClick={closeModal}>
								<span className="bg-transparent text-purp-normal opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
							</button>
						</div>
						<div className="relative p-6 flex-auto">
							<div className="flex flex-col">
								<p>
									Confirm you want to remove this emplooyee by typing their name:{' '}
									<span className="font-semibold">
										{firstName} {lastName}
									</span>
								</p>
								<input type="text" name="confirmDelete" onChange={(e) => setConfirmDelete(e.target.value)} placeholder={`${firstName} ${lastName}`} className="border border-purp-light px-4 py-2 mt-3 w-64" />
							</div>
						</div>
						<div className="flex items-center justify-end px-5 pb-5 rounded-b">
							<button className="text-purp-light hover:text-purp-normal font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 transition duration-200 ease" onClick={closeModal}>
								Cancel
							</button>
							<button
								type="submit"
								disabled={removeButton}
								className={`bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 transition duration-200 ease ${removeButton ? 'opacity-50 cursor-not-allowed' : null}`}
								onClick={handleDelete}>
								Remove
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</React.Fragment>
	)
}

export default RemoveEmployeeModal

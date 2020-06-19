import React, { useState, useEffect, useContext } from 'react'
import { storage, functions, db } from '../../firebase/firebase'
import { AuthContext } from '../../context/Auth'
import Icon from '@mdi/react'
import { mdiLoading, mdiCamera } from '@mdi/js'

const ChangeProfileImage = () => {
	const { currentUser } = useContext(AuthContext)
	const [profileImage, setProfileImage] = useState(null)
	const [photoURL, setPhotoURL] = useState('')
	const [loading, setLoading] = useState(false)
	const updateUserPhoto = functions.httpsCallable('updateUserPhoto')

	const handleUpload = () => {
		setLoading(true)
		const uploadTask = storage.ref(`profile-images/${profileImage.name}`).put(profileImage)
		uploadTask.on(
			'state_changed',
			(snapshot) => {},
			(error) => {
				alert(error)
			},
			() => {
				storage
					.ref('profile-images')
					.child(profileImage.name)
					.getDownloadURL()
					.then((url) => {
						db.collection('Employees')
							.doc(currentUser.uid)
							.update({ imageUrl: url })
							.then(() => {
								setPhotoURL(url)
							})
							.catch((error) => {
								alert(error)
							})
					})
			}
		)
	}

	useEffect(() => {
		if (profileImage) {
			handleUpload()
		}
	}, [profileImage])

	useEffect(() => {
		if (photoURL) {
			updateUserPhoto({ id: currentUser.uid, photoURL }).then(() => {
				setLoading(false)
				setProfileImage(null)
				window.location.reload()
			})
		}
	}, [photoURL])

	const matches = currentUser.displayName.match(/\b(\w)/g)
	const initials = matches.join('')

	return (
		<div>
			<div className="w-full bg-white rounded shadow">
				<div className="h-32 bg-purp-medium"></div>
				<div className="px-6 pb-8 -mt-16 flex items-center">
					{currentUser.photoURL ? (
						<div className="h-32 w-32 rounded-full border-4 border-white relative" alt="profile image" style={{ backgroundImage: `url('${currentUser.photoURL}')`, backgroundSize: 'cover' }}>
							<div
								className="w-full h-full opacity-0 hover:opacity-100 rounded-full transition duration-200 ease-in-out"
								style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/kstg-6225.appspot.com/o/images%2Fupload-icon.svg?alt=media&token=9f1ccfe5-41b8-40e0-8e75-0a80d6deb6c8")' }}>
								<input type="file" className="cursor-pointer absolute w-full h-full opacity-0" name="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
							</div>
						</div>
					) : (
						<div className="h-32 w-32 rounded-full border-4 border-white bg-purp-light relative flex items-center justify-center">
							<p className="absolute text-3xl">{initials}</p>
							<div
								className="w-full h-full z-50 opacity-0 hover:opacity-100 rounded-full transition duration-200 ease-in-out"
								style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/kstg-6225.appspot.com/o/images%2Fupload-icon.svg?alt=media&token=9f1ccfe5-41b8-40e0-8e75-0a80d6deb6c8")' }}>
								<input type="file" className="cursor-pointer absolute w-full h-full opacity-0" name="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
							</div>
						</div>
					)}
					<div className="mt-16">
						<h1 className="text-2xl font-semibold ml-4 text-purp-normal">{currentUser.displayName}</h1>
						<h2 className="ml-4 text-purp-normal">{currentUser.email}</h2>
						<h3 className="ml-4 text-purp-normal">{currentUser.isSuperAdmin ? 'Super Admin' : null}</h3>
					</div>
				</div>
				{loading ? <Icon path={mdiLoading} size={1} spin={(true, 1)} /> : null}
			</div>
		</div>
	)
}

export default ChangeProfileImage

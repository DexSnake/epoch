import React, { useState } from 'react'

const ChangeProfileImage = () => {
	const [profileImage, setProfileImage] = useState(null)
	return <input type="file" name="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
}

export default ChangeProfileImage

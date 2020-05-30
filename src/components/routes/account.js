import React, { useContext, useState, useEffect } from 'react'
import Layout from '../Layout'
import { AuthContext } from '../../context/Auth'
import { auth } from '../../firebase/firebase'
import ChangePassword from '../Account/ChangePassword'

const Account = () => {
	return (
		<Layout>
			<ChangePassword />
		</Layout>
	)
}

export default Account

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const AdminRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useContext(AuthContext)

	return <Route {...rest} render={(props) => (currentUser.accessLevel >= 2 ? <Component {...props} /> : null)} />
}

export default AdminRoute

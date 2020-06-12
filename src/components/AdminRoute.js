import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const AdminRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useContext(AuthContext)

	return <Route {...rest} render={(props) => (currentUser.isAdmin ? <Component {...props} /> : <Redirect to={'/login'} />)} />
}

export default AdminRoute

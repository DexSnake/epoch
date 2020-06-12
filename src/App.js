import React from 'react'
import './styles/styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './context/Auth'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Dashboard from './components/routes/dashboard'
import Login from './components/routes/login'
import Employees from './components/routes/employees'
import NewEditEmployee from './components/routes/new-edit-employee'
import NewRequest from './components/routes/new-request'
import Account from './components/routes/account'
import ResetPassword from './components/routes/password-reset'
import AddEmployee from './components/routes/add-employee'
import Requests from './components/routes/requests'
import PendingRequests from './components/routes/pending-requests'
import EditRequest from './components/routes/edit-request'
import ApprovedRequests from './components/routes/approved-requests'
import DeniedRequests from './components/routes/denied-requests'
import TestPage from './components/routes/test'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Route path="/login" component={Login} />
				<PrivateRoute path="/testing" component={TestPage} />
				<Route path="/password-reset" component={ResetPassword} />
				<PrivateRoute path="/" exact component={Dashboard} />
				<PrivateRoute path="/add-employee" component={AddEmployee} />
				<AdminRoute path="/employees" exact component={Employees} />
				<PrivateRoute path="/employees/edit/:id" component={NewEditEmployee} />
				<PrivateRoute path="/new-request" component={NewRequest} />
				<PrivateRoute path="/pending-requests" component={PendingRequests} />
				<PrivateRoute path="/approved-requests" component={ApprovedRequests} />
				<PrivateRoute path="/denied-requests" component={DeniedRequests} />
				<PrivateRoute path="/requests" exact component={Requests} />
				<PrivateRoute path="/requests/edit/:id" component={EditRequest} />
				<PrivateRoute path="/account" component={Account} />
			</Router>
		</AuthProvider>
	)
}

export default App

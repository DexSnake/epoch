import React from 'react'
import 'styles/styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from 'context/Auth'
import PrivateRoute from 'components/PrivateRoute'
import AdminRoute from 'components/AdminRoute'
import SuperAdminRoute from 'components/SuperAdminRoute'
import Dashboard from 'components/routes/dashboard'
import Login from 'components/routes/login'
import Employees from 'components/routes/employees'
import EditEmployee from 'components/routes/edit-employee'
import AddRequest from 'components/routes/add-request'
import Account from 'components/routes/account'
import ResetPassword from 'components/routes/password-reset'
import AddEmployee from 'components/routes/add-employee'
import Requests from 'components/routes/requests'
import PendingRequests from 'components/routes/pending-requests'
import EditRequest from 'components/routes/edit-request'
import DeniedRequests from 'components/routes/denied-requests'
import Users from 'components/routes/users'
import EditUser from 'components/routes/edit-user'
import UpcomingRequests from 'components/routes/upcoming-requests'
import TimeClock from 'components/routes/time-clock'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Route path="/login" component={Login} />
				<Route path="/password-reset" component={ResetPassword} />
				<PrivateRoute path="/" exact component={Dashboard} />
				<PrivateRoute path="/add-employee" component={AddEmployee} />
				<SuperAdminRoute path="/users" component={Users} />
				<SuperAdminRoute path="/user/edit/:id" component={EditUser} />
				<AdminRoute path="/employees" component={Employees} />
				<PrivateRoute path="/employee/edit/:id" component={EditEmployee} />
				<PrivateRoute path="/add-request" component={AddRequest} />
				<PrivateRoute path="/pending-requests" component={PendingRequests} />
				<PrivateRoute path="/upcoming-requests" component={UpcomingRequests} />
				<PrivateRoute path="/denied-requests" component={DeniedRequests} />
				<PrivateRoute path="/requests" exact component={Requests} />
				<PrivateRoute path="/request/edit/:id" component={EditRequest} />
				<PrivateRoute path="/account" component={Account} />
				<PrivateRoute path="/time-clock" component={TimeClock} />
			</Router>
		</AuthProvider>
	)
}

export default App

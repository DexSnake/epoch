import React from 'react'
import './styles/styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './context/Auth'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/routes'
import Dashboard from './components/routes/dashboard'
import Login from './components/routes/login'
import SignUp from './components/routes/sign-up'
import Employees from './components/routes/employees'
import EditEmployee from './components/routes/edit-employee'
import NewRequest from './components/routes/new-request'
import Account from './components/routes/account'
import ResetPassword from './components/routes/password-reset'
import AddEmployee from './components/routes/add-employee'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Route path="/" exact component={Home} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/password-reset" component={ResetPassword} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/add-employee" component={AddEmployee} />
				<PrivateRoute path="/employees" exact component={Employees} />
				<PrivateRoute path="/employees/edit/:id" component={EditEmployee} />
				<PrivateRoute path="/new-request" component={NewRequest} />
				<PrivateRoute path="/account" component={Account} />
			</Router>
		</AuthProvider>
	)
}

export default App

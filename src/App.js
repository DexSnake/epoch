import React from 'react'
import './styles/styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Employees from './components/Employees'
import EditEmployee from './components/EditEmployee'
import { AuthProvider } from './context/Auth'
import PrivateRoute from './components/PrivateRoute'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Route path="/" exact component={Home} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/employees" exact component={Employees} />
				<PrivateRoute path="/employees/edit/:id" component={EditEmployee} />
			</Router>
		</AuthProvider>
	)
}

export default App

import React from 'react'
import './styles/styles.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Employees from './components/Employees'
import EditEmployee from './components/EditEmployee'

function App() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Login} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/employees" exact component={Employees} />
			<Route path="/employees/edit/:id" component={EditEmployee} />
		</BrowserRouter>
	)
}

export default App

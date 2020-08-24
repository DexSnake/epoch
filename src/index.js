import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import LogRocket from 'logrocket'
LogRocket.init(process.env.REACT_APP_LOG_ROCKET)

ReactDOM.render(<App />, document.getElementById('root'))

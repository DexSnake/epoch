import React from 'react'
import Layout from './Login'

const EditEmployeeTwo = (props) => {
	console.log(props.location.state.msg)
	return (
		<Layout>
			<p>test</p>
		</Layout>
	)
}

export default EditEmployeeTwo

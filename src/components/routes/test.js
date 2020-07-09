import React from 'react'
import Layout from 'components/Layout/Layout'
import { useForm } from 'react-hook-form'

const TestPage = () => {
	const { register, handleSubmit, watch, errors } = useForm()
	const onSubmit = (data) => console.log(data)

	console.log(watch('example'))
	return (
		<Layout>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* register your input into the hook by invoking the "register" function */}
				<input name="example" defaultValue="test" ref={register} />

				{/* include validation with required or other standard HTML validation rules */}
				<input
					name="exampleRequired"
					ref={register({
						required: 'its required, yo!',
						pattern: { value: /^[0-9]*$/, message: 'gotta be a number!' }
					})}
				/>
				{errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}

				<input type="submit" />
			</form>
		</Layout>
	)
}

export default TestPage

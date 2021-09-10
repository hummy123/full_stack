import React from 'react'
import PropTypes from 'prop-types'

const TextInput = (props) => {
	const enterValue = (event) =>
		props.object.setValue(event.target.value)

	return (<div>
		<label>{props.object.label}</label>
		<input value={props.object.value} onChange={enterValue} />
	</div>)
}

TextInput.propTypes = {
	object: PropTypes.object.isRequired
}

export default TextInput

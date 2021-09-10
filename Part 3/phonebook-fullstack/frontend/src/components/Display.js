import React from 'react'
import PropTypes from 'prop-types'
import Person from './Person'

const Display = (props) => {

	return (
		<>
			<h2>People</h2>
			<ul>
				{props.persons.map(person =>
					<Person key={person.name} person={person} object={props.object}  />
				)}
			</ul>
		</>
	)
}

Display.propTypes = {
	persons: PropTypes.array.isRequired,
	object: PropTypes.object.isRequired
}

export default Display

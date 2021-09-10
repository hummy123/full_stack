import React from 'react'
import personService from '../services/persons'
import PropTypes from 'prop-types'

const Person = ({person, object: {persons, setPersons, notify}}) => {

	const deletePerson = async (id) => {
		if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
			await personService.deletePerson(id)
			const newPersons = [...persons].filter(curPerson => {
				return (curPerson.id !== id ? curPerson : undefined)
			})
			setPersons(newPersons)
			notify(`You have deleted ${person.name}'s contact.`)
		}
	}

	return (<li>
        Name: {person.name} Number: {person.number}
		<button onClick={
			() => deletePerson(person.id)}>
            Delete
		</button>
	</li>)
}

Person.propTypes = {
	person: PropTypes.object.isRequired,
	object: PropTypes.object.isRequired
}

export default Person

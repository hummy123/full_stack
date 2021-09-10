import React, {useState} from 'react'
import TextInput from './TextInput'
import personService from '../services/persons'
import PropTypes from 'prop-types'

const Form = (props) => {
	//destructure props
	const persons = props.object.persons
	const setPersons = props.object.setPersons
	const notify = props.object.notify

	//declare values used for name input
	const [ newName, setNewName ] = useState('')
	const nameObjects = {
		label: 'name',
		value: newName,
		setValue: setNewName
	}

	//declare values used for number input
	const [ newNumber, setNewNumber ] = useState('')
	const numberObjects = {
		label: 'number',
		value: newNumber,
		setValue: setNewNumber
	}

	//add person
	const addPerson = async (event) => {
		event.preventDefault()
		const person = checkExists()

		if (!person) {
			const personObject = {
				name: newName,
				number: newNumber
			}
			try {
				await personService.savePerson(personObject)
				setPersons(persons.concat(personObject))
				await notify(`${personObject.name}'s contact details have been added!`)
				setNewName('')
				setNewNumber('')
			} catch (err) {
				await notify(err.response.data.error)
			}
		} else {
			await updatePerson(person)
		}
	}

	//update person
	const updatePerson = async (person) => {
		if (window.confirm(`Do you want to update ${newName}'s number?`)) {
			const newPerson = {...person, 'number': newNumber}
			try {
				await personService.updatePerson(newPerson)
				await notify(`${newPerson.name}'s contact details have been updated!`)
				setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson))
			} catch (err) {
				const message = err.response.data.error
				if (message === 'malformed id') {
					await notify('The contact you are trying to update has been deleted!')
					setPersons(persons.filter(person => person.id !== newPerson.id ? person : undefined))
				} else await notify(err.response.data.error)
			}
		}
	}

	/* check if person already exists (called while adding new)
     * and return person object if exist */
	const checkExists = () => {
		return persons.find(person => person.name === newName)
	}

	return (
		<>
			<h2>Add a person</h2>
			<form onSubmit={addPerson}>
				<TextInput object={nameObjects} />
				<TextInput object={numberObjects} />
				<button type="submit">add</button>
			</form>
		</>
	)
}

Form.propTypes = {
	object: PropTypes.object.isRequired
}

export default Form

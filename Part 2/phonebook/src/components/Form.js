import React, {useState} from "react";
import TextInput from "./TextInput";
import personService from '../services/persons'

const Form = (props) => {
    //destructure props
    const persons = props.object.persons
    const setPersons = props.object.setPersons

    //declare values used for name input
    const [ newName, setNewName ] = useState('')
    const nameObjects = {
        label: "name",
        value: newName,
        setValue: setNewName
    }

    //declare values used for number input
    const [ newNumber, setNewNumber ] = useState('')
    const numberObjects = {
        label: "number",
        value: newNumber,
        setValue: setNewNumber
    }

    //add person
    const addPerson = (event) => {
        event.preventDefault()
        const person = checkExists()

        if (!person) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService.savePerson(personObject)
            setPersons(persons.concat(personObject))
            setNewName("")
            setNewNumber("")
        } else {
            updatePerson(person)
        }
    }

    //update person
    const updatePerson = (person) => {
        if (window.confirm(`Do you want to update ${newName}'s number?`)) {
            const newPerson = { ...person, 'number' : newNumber }
            personService.updatePerson(newPerson)
        }
    }

    //check if person already exists (called while adding new)
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

export default Form

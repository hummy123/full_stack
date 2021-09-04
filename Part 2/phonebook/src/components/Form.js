import React, {useState} from "react";
import TextInput from "./TextInput";
import personService from '../services/persons'
import Notification from "./Notification";

const Form = (props) => {
    //destructure props
    const persons = props.object.persons
    const setPersons = props.object.setPersons
    const notify = props.object.notify

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
    const addPerson = async (event) => {
        event.preventDefault()
        const person = checkExists()

        if (!person) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            await personService.savePerson(personObject)
            setPersons(persons.concat(personObject))
            await notify(`${personObject.name}'s contact details have been added!`)
            setNewName("")
            setNewNumber("")
        } else {
            updatePerson(person)
        }
    }

    //update person
    const updatePerson = async (person) => {
        if (window.confirm(`Do you want to update ${newName}'s number?`)) {
            const newPerson = {...person, 'number': newNumber}
            const result = await personService.updatePerson(newPerson)
            if (result) {
                await notify(`${newPerson.name}'s contact details have been updated!`)
                setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson))
            } else {
                await notify('The contact you are trying to update has been deleted!')
                setPersons(persons.filter(person => person.id !== newPerson.id ? person : undefined))
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

export default Form

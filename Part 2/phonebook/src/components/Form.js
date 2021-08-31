import React, {useState} from "react";
import TextInput from "./TextInput";

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
        if (!checkExists()) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject))
            setNewName("")
            setNewNumber("")
        } else {
            alert(`${newName} already exists!`)
        }
    }

    //check if person already exists (called while adding new)
    const checkExists = (event) => {
        if (persons.some(person => person.name === newName))
            return true
        else
            return false
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

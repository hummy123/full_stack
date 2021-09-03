import React from "react";
import personService from "../services/persons";

const Person = ({person, object: {persons, setPersons}}) => {

    const deletePerson = (id) => {
        if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
            personService.deletePerson(id)
            const newPersons = [...persons].filter(curPerson => {
                return (curPerson.id !== id ? curPerson : undefined)
            })
            setPersons(newPersons)
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

export default Person

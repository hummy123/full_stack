import React, { useState } from 'react'
import Form from "./components/Form";
import Display from "./components/Display";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const personObject = {
        persons: persons,
        setPersons: setPersons
    }

    const [filteredPeople, setFilterPeople] = useState(persons)
    const filterObject = {
        persons: persons,
        setFilterPeople: setFilterPeople
    }

    return (
        <>
            <h1>Phonebook</h1>
            <Filter object={filterObject} />
            <Display persons={filteredPeople} />
            <Form object={personObject} />
        </>
  )
}

export default App

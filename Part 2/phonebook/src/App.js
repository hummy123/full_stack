import React, {useEffect, useState} from 'react'
import Form from "./components/Form";
import Display from "./components/Display";
import Filter from "./components/Filter";
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    },[])

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

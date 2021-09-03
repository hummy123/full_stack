import React, {useEffect, useState} from 'react'
import Form from "./components/Form";
import Display from "./components/Display";
import Filter from "./components/Filter";
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect( () => {
        const fetchData = async () => {
            setPersons(await personService.getAll())
        }
        fetchData()
    },[persons])

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
            <Display persons={filteredPeople} object={personObject} />
            <Form object={personObject} />
        </>
  )
}

export default App

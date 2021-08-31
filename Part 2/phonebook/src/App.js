import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
  const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterList, setFilterList ] = useState('')


    const addPerson = () => {
        const personObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName("")
    }

    const checkExists = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName))
            alert(`${newName} already exists!`)
        else
            addPerson()
    }

    const enterName = (event) => {
        setNewName(event.target.value)
    }

    const enterNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const peopleToShow = persons.filter(person => {
        const lowName = person.name.toLowerCase()
        const lowFilter = filterList.toLowerCase()
        return lowName.includes(lowFilter)
    })

    const enterFilter = (event) => {
        setFilterList(event.target.value)
    }

    return (
      <div>
        <h2>Phonebook</h2>
          filter shown with <input onChange={enterFilter} />
        <form onSubmit={checkExists}>
          <div>
            name: <input value={newName} onChange={enterName} />
          </div>
            <div>
                number: <input value={newNumber} onChange={enterNumber} />
            </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {peopleToShow.map(person =>
                <Person key={person.name} person={person} />
            )}
        </ul>
      </div>
  )
}

export default App

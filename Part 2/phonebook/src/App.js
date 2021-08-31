import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "07835 209170" }
  ])
  const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')


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

  return (
      <div>
        <h2>Phonebook</h2>
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
            {persons.map(person =>
                <Person key={person.name} person={person} />
            )}
        </ul>
      </div>
  )
}

export default App

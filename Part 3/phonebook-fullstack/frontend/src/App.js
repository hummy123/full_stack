import React, {useEffect, useState} from 'react'
import Form from './components/Form'
import Display from './components/Display'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])

	const [notifMessage, setNotifMessage ] = useState(null)
	const notify = async (message) => {
		setNotifMessage(message)
		setTimeout(() => {
			setNotifMessage(null)
		}, 5000)
	}

	useEffect( () => {
		const fetchData = async () => {
			setPersons(await personService.getAll())
		}
		fetchData()
	},[setPersons])

	const personObject = {
		persons: persons,
		setPersons: setPersons,
		notify: notify
	}

	const [filteredPeople, setFilterPeople] = useState(persons)
	const filterObject = {
		persons: persons,
		setFilterPeople: setFilterPeople
	}

	return (
		<>
			<h1>Phonebook</h1>
			<Notification message={notifMessage} />
			<Filter object={filterObject} />
			<Display persons={filteredPeople} object={personObject} />
			<Form object={personObject} />
		</>
	)
}

export default App

import axios from "axios";
const baseLink = 'http://localhost:3001/api/persons'

const getAll = async () => {
    try {
        return (await axios.get(baseLink)).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

const updatePerson = async (updatedPerson) => {
    try {
        return (await axios.put(
            `${baseLink}/${updatedPerson.id}`,
            updatedPerson)).data
    } catch (err) {
        console.log(err)
        return false
    }
}

const savePerson = async (personObject) => {
    try {
        return (await axios.post(baseLink, personObject)).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

const deletePerson = async (id) => {
    try {
        return (await axios.delete(`${baseLink}/${id}`)).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

const defaultExports = {getAll, updatePerson, savePerson, deletePerson}

export default defaultExports

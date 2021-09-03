import axios from "axios";
const baseLink = 'http://localhost:3001/persons'

const getAll = async () => {
    try {
        return (await axios.get("http://localhost:3001/persons")).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

const updatePerson = async (id, updatedPerson) => {
    try {
        return (await axios.put(
            `http://localhost:3001/persons/${id}`,
            updatedPerson)).data
    } catch (err) {
        console.log(err)
        throw err
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

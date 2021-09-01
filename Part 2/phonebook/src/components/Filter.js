import React, {useState} from "react";
import TextInput from "./TextInput";

const Filter = ({object: {setFilterPeople, persons}}) => {
    //declare values used for filter input
    const [ textFilter, setTextFilter ] = useState('')

    const setPeopleFilter = (text) => {
        setTextFilter(text)
        setFilterPeople(persons.filter(person => {
            //store lower case values, so comparison is case-insensitive
            const lowName = person.name.toLowerCase()
            const lowFilter = textFilter.toLowerCase()

            //return person if name contains filter string
            if (lowName.includes(lowFilter))
                return person
            else return undefined
        }))}

    const textObjects = {
        label: "name",
        value: textFilter,
        setValue: setPeopleFilter
    }



    return(
        <>
            <h2>Filter list</h2>
            <TextInput object={textObjects}/>
        </>
    )
}

export default Filter

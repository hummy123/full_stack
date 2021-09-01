import React, {useCallback, useEffect, useState} from "react";
import TextInput from "./TextInput";

const Filter = ({object: {setFilterPeople, persons}}) => {
    //declare values used for filter input
    const [ textFilter, setTextFilter ] = useState('')

    useEffect(() => {
        setFilterPeople(persons.filter(person => {
            //store lower case values, so comparison is case-insensitive
            const lowName = person.name.toLowerCase()
            const lowFilter = textFilter.toLowerCase()

            //return person if name contains filter string
            if (lowName.includes(lowFilter))
                return person
            else return undefined
        }))
    }, [textFilter, persons])

    //objects for text input element
    const textObjects = {
        label: "name",
        value: textFilter,
        setValue: setTextFilter
    }

    return(
        <>
            <h2>Filter list</h2>
            <TextInput object={textObjects}/>
        </>
    )
}

export default Filter

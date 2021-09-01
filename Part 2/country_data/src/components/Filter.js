import React, {useEffect, useState} from "react";
import TextInput from "./TextInput";

const Filter = ({object: {setFilterCountries, countries}}) => {
    //declare values used for filter input
    const [ textFilter, setTextFilter ] = useState('')

    //when person object changes (because of form)
    //or when text filter changes, update filter

    useEffect(() => {
        setFilterCountries(countries.filter(country => {
            //store lower case values, so comparison is case-insensitive
            const lowName = country.name.toLowerCase()
            const lowFilter = textFilter.toLowerCase()

            //return person if name contains filter string
            if (lowName.includes(lowFilter))
                return country
            else return undefined
        }))
    }, [textFilter, setFilterCountries, countries])

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

import React from 'react'
import CountryList from "./CountryList";
import CountryDetailed from "./CountryDetailed";

const Display = ({countries}) => {

    const displayChoice = () => {
        if (countries.length > 10) return "Too many matches, specify another filter"
        else if (countries.length > 1) return displayList()
        else if (countries.length === 1) return <CountryDetailed country={countries[0]} />
        else return "no matches found"
    }

    const displayList = () => {
        return(<CountryList countries={countries}/>)
    }

    return displayChoice()
}

export default Display

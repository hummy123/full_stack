import React from 'react'
import Person from "./Person";

const Display = (props) => {

    return (
        <>
            <h2>People</h2>
            <ul>
                {props.persons.map(person =>
                    <Person key={person.name} person={person} object={props.object}  />
                )}
            </ul>
        </>
    )
}

export default Display

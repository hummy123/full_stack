import React from 'react'
import Person from "./Person";

const Display = (props) => {

    /* display filtered list:
        {peopleToShow.map(person =>
        <Person key={person.name} person={person} />
        )}
     */

    return (
        <>
            <h2>People</h2>
            <ul>
                {props.persons.map(person =>
                    <Person key={person.name} person={person} />
                )}
            </ul>
        </>
    )
}

export default Display

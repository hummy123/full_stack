import React from "react";

const Person = (props) => {
    return <li>Name: {props.person.name} Number: {props.person.number}</li>
}

export default Person

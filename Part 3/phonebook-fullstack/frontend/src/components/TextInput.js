import React from "react";

const TextInput = (props) => {
    const enterValue = (event) =>
        props.object.setValue(event.target.value)

    return (<div>
        <label>{props.object.label}</label>
        <input value={props.object.value} onChange={enterValue} />
    </div>)
}

export default TextInput

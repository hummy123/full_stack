import React, { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    if (!visible)
        return (
            <div>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
        )
    else
        return (
            <div>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        )
}

export default Togglable

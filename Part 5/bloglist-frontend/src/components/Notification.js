import React from 'react'

const Notification = ({ message, setNotification }) => {

    setTimeout(() => {
        setNotification(null)
    }, 5000)

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification

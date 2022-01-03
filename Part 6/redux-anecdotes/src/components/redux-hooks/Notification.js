import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  const open = notification.open

  //styles to use
  const openStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'block'
  }

  const closedStyle = {
    display: 'none'
  }

  const styleToUse = open ? openStyle : closedStyle

  return (
    <div style={styleToUse}>
      {message}
    </div>
  )
}

export default Notification

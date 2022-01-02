import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
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

  if (open === true) {
    setTimeout(() => dispatch(close()), 5000);
  }

  return (
    <div style={styleToUse}>
      {message}
    </div>
  )
}

export default Notification

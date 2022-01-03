import React from 'react'
import { connect } from 'react-redux'

const ConnectNotification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(ConnectNotification)

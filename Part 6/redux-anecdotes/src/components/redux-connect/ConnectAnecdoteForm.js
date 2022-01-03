import React from 'react'
import { connect } from 'react-redux'
import { add } from '../../reducers/anecdoteReducer'
import { notify } from '../../reducers/notificationReducer'

const ConnectAnecdoteForm = (props) => {
  const dispatchAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    props.add(anecdote)
    props.notify(`You addeed ${anecdote}`)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={dispatchAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  add,
  notify
}

export default connect(
  null,
  mapDispatchToProps
)(ConnectAnecdoteForm)


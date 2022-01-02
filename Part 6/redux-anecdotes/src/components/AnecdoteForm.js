import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { postAnecdote } from '../services/anecdoteServices'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const dispatchAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(add(anecdote))
    dispatch(notify(`You addeed ${anecdote}`))
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

export default AnecdoteForm
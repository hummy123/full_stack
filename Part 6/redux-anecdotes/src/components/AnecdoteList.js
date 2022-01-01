import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => ({anecdotes: state.anecdotes, filter: state.filter}))
  const dispatch = useDispatch()

  const dispatchVote = (id, anecdote) => {
    dispatch(vote(id))
    dispatch(notify(`You voted ${anecdote}`))
  }

  const anecdotes = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatchVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
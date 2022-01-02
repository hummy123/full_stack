import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { add } from './reducers/anecdoteReducer'
import { getAnecdotes } from './services/anecdoteServices'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getAnecdotes().then((anecdotes) => {
      for (const anecdote of anecdotes) {
        dispatch(add(anecdote))
      }
    })
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
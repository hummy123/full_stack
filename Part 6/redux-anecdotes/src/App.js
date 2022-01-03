import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadAnecdotes } from './reducers/anecdoteReducer'

// these components use redux hooks (recommended/preferred way)
// import AnecdoteForm from './components/redux-hooks/AnecdoteForm'
import AnecdoteList from './components/redux-hooks/AnecdoteList'
// import Notification from './components/redux-hooks/Notification'
// import Filter from './components/redux-hooks/Filter'

// these components use older redux connect style
import ConnectNotification from './components/redux-connect/ConnectNotification'
import ConnectFilter from './components/redux-connect/ConnectFilter'
import ConnectAnecdoteForm from './components/redux-connect/ConnectAnecdoteForm'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectNotification />
      <ConnectFilter />
      <AnecdoteList />
      <ConnectAnecdoteForm />
    </div>
  )
}

export default App
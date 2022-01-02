import { getAnecdotes, postAnecdote, updateAnecdote } from "../services/anecdoteServices"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      // new array containing anecdotes, with updated anecdote as well
      const newState = state.map(
        (anecdote) => anecdote.id !== action.data.id 
        ? anecdote : action.data)
      
      //sort by number of votes and return
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case 'ADD':
      return state.concat(action.object)
    case 'LOAD_ANECDOTES':
      const sorted = action.data
      sorted.sort((a, b) => b.votes - a.votes)
      return sorted
    default:
      return state
  }
}

export const loadAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes()
    dispatch({
      type: 'LOAD_ANECDOTES',
      data: anecdotes
    })
  }
}

export const add = (content) => {
  return async (dispatch) => {
    const anecdote = await postAnecdote(content)
    dispatch({
      type: 'ADD', 
      object: anecdote
    })
  }
} 

export const vote = (anecdote) => {
  return async (dispatch) => {
    const incremented = {...anecdote, votes: anecdote.votes + 1}
    const updated = updateAnecdote(incremented)
    dispatch({ type: 'VOTE', data: updated})
  }
} 


export default reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      //copy state values to new variable because pure function
      let newState = [...state]

      //get anecdote object with this id
      let anecdote = newState.find(anecdote => anecdote.id === action.id)

      //get index of anecdote object
      const anecdoteIndex = newState.indexOf(anecdote)

      //increment anecdote votes
      anecdote = {...anecdote, votes: anecdote.votes + 1}

      //replace old anecdote with new
      newState[anecdoteIndex] = anecdote
      
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case 'ADD':
      return state.concat(action.object)
    default:
      return state
  }
}

export const vote = (id) => ({ type: 'VOTE', id: id})
export const add = (object) => ({type: 'ADD', object: object})

export default reducer
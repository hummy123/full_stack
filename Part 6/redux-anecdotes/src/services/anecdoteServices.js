import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}

export const postAnecdote = async (anecdote) => {
    const object = asObject(anecdote)
    const response = await axios.post(baseUrl, object)
    return response.data
}

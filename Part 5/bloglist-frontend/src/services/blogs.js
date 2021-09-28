import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlog) => {
  const credentials = window.localStorage.getItem('credentials')
  const user = JSON.parse(credentials)
  const token = user.token
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const defaultExports = { getAll, addBlog }

export default defaultExports

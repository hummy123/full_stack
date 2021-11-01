import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setHeader = () => {
  const credentials = window.localStorage.getItem('credentials')
  const user = JSON.parse(credentials)
  const token = user.token
  return {
    headers: {Authorization: `bearer ${token}`}
  }
}

const addBlog = async (newBlog) => {
  const header = setHeader()
  try {
    const response = await axios.post(baseUrl, newBlog, header)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const likeBlog = async (blog) => {
  const header = setHeader()
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`,
        {likes: blog.likes + 1},
        header)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const deleteBlog = async (blog) => {
  const header = setHeader()
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, header)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const defaultExports = { getAll, addBlog, likeBlog, deleteBlog }

export default defaultExports

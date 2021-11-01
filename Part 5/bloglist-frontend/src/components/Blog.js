import React, {useState} from 'react'
import blogs from "../services/blogs";
const Blog = ({blog, setNotification}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const styles = {
      border: "1px solid black",
      width: "fit-content"
  }

  const addLike = async () => {
      try {
          const result = await blogs.likeBlog(blog)
          setNotification(`liked blog ${result.title}`)
      } catch (err) {
          setNotification(err.message)
      }
  }

  const deleteBlog = async () => {
      if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
          try {
              await blogs.deleteBlog(blog)
              setNotification(`Deleted blog ${blog.title}`)
          } catch (err) {
              setNotification(err.message)
          }
      }
  }

  if (!showDetails)
    return (
        <div style={styles}>
          {blog.title}
          <button onClick={toggleDetails}>
            view
          </button>
        </div>
    )
  else
    return (
        <div style={styles}>
          <div>
            title: {blog.title}
              <button onClick={toggleDetails}>hide</button>
          </div>
          <div>
            by: {blog.author}
          </div>
          <div>
              likes: {blog.likes} <button onClick={addLike}>like</button>
          </div>
            <div>
                url: {blog.url}
            </div>
            <button onClick={deleteBlog}>
                Delete
            </button>
        </div>
    )
}

export default Blog

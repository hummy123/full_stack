import Blog from "./Blog";
import React from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({blogs, name, setUser, setNotification}) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('credentials')
        setUser(null)
    }

    const sortedBlogs = blogs.sort(
        (a, b) => {
            return a.likes + b.likes
        }
    )

    return(
        <>
            <h2>blogs</h2>
            <p>{name} is logged in
                <button onClick={logoutHandler}>log out</button>
            </p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setNotification={setNotification} />
            )}
            <Togglable buttonLabel="Add blog">
                <BlogForm setNotification={setNotification} />
            </Togglable>
        </>
    )
}

export default Blogs

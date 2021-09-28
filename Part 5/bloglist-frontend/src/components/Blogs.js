import Blog from "./Blog";
import React from "react";
import BlogForm from "./BlogForm";

const Blogs = ({blogs, name, setUser, setNotification}) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('credentials')
        setUser(null)
    }

    return(
        <>
            <h2>blogs</h2>
            <p>{name} is logged in
                <button onClick={logoutHandler}>log out</button>
            </p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            <BlogForm setNotification={setNotification} />
        </>
    )
}

export default Blogs

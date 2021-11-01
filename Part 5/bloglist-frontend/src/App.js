import './index.css'
import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        getBlogs()
        checkLogin()
    }, [])

    const getBlogs = () => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

    const checkLogin = () => {
        const loggedInUser = window.localStorage.getItem('credentials')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
        }
    }

    return (
        <>
            {notification && <Notification
                message={notification}
                setNotification={setNotification}
            />}

            {user === null
                ? <LoginForm
                    setUser={setUser}
                    setNotification={setNotification}
                />
                : <Blogs name={user.name}
                         blogs={blogs}
                         setUser={setUser}
                         setNotification={setNotification}
                />}
        </>
    )
}

export default App

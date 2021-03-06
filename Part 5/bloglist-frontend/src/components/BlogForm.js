import React, { useState } from 'react'
import blogs from '../services/blogs.js'

const BlogForm = ({ setNotification, mockSubmitter }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const newBlog = async (event) => {
        event.preventDefault()
        try {
            const result = await blogs.addBlog({ title, author, url })
            setNotification(`added blog ${result.title}`)
        } catch (err) {
            setNotification(err.message)
        }
    }

    return (
        <>
            <h2>Add new blog</h2>
            <form onSubmit={mockSubmitter || newBlog}>
                <div>
                    <label>Title</label>
                    <input
                        id="title"
                        type={'text'}
                        value={title}
                        name={'title'}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        id="author"
                        type={'text'}
                        value={author}
                        name={'author'}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label>url</label>
                    <input
                        id="url"
                        type={'text'}
                        value={url}
                        name={'url'}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button
                    id="submitButton"
                    type={'submit'}>Add blog</button>
            </form>
        </>
    )
}

export default BlogForm

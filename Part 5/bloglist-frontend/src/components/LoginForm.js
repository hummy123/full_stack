import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login( { username, password } )
            setUser(user)
            window.localStorage.setItem('credentials', JSON.stringify(user))
        } catch (err) {
            setNotification('Invalid username or password.')
        }
    }

    return(
        <>
            <h1>login to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>username</label>
                    <input type={'text'}
                        value={username}
                        name={'username'} id={'username'}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input type={'password'}
                        value={password}
                        name={'password'} id={'password'}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type={'submit'}>log in</button>
            </form>
        </>
    )
}

export default LoginForm

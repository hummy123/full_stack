import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {good, ok, bad, reset} from './reducer'

const App = () => {
    const dispatch = useDispatch()
    const feedback = useSelector(state => state)

    return (
        <div>
            <button onClick={() => dispatch(good())}>good</button>
            <button onClick={() => dispatch(ok())}>ok</button>
            <button onClick={() => dispatch(bad())}>bad</button>
            <button onClick={() => dispatch(reset())}>reset stats</button>
            <div>good {feedback.good}</div>
            <div>ok {feedback.ok}</div>
            <div>bad {feedback.bad}</div>
        </div>
    )
}

export default App
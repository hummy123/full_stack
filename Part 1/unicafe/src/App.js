import React, { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good+1)
    const handleNeutral = () => setNeutral(neutral+1)
    const handleBad = () => setBad(bad+1)

    const all = good + bad + neutral
    const average = good - bad
    const positive = (good / all * 100) + "%"

    const textGood = "good"
    const textNeutral = "neutral"
    const textBad = "bad"

    return (
        <div>
            <Heading text={"give feedback"} />
            <Button text={textGood} onClick={() => handleGood()} />
            <Button text={textNeutral} onClick={() => handleNeutral()} />
            <Button text={textBad} onClick={() => handleBad()} />
            <Heading text={"stats"} />
            <Stats type={textGood} num={good} />
            <Stats type={textNeutral} num={neutral} />
            <Stats type={textBad} num={bad} />
            <Stats type={"all"} num={all} />
            <Stats type={"average"} num={average} />
            <Stats type={"positive"} num={positive} />
        </div>
    )
}

const Heading = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const Stats = (props) => <p>{props.type} {props.num}</p>


export default App

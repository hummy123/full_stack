import React, { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good+1)
    const handleNeutral = () => setNeutral(neutral+1)
    const handleBad = () => setBad(bad+1)

    return (
        <>
            <Heading text={"give feedback"} />
            <Button text={"good"} onClick={() => handleGood()} />
            <Button text={"neutral"} onClick={() => handleNeutral()} />
            <Button text={"bad"} onClick={() => handleBad()} />
            <Heading text={"stats"} />
            <StatsController stats={{good, neutral, bad}}/>
        </>
    )
}

const StatsController = ({stats: {bad, good, neutral}}) => {

    const all = good + bad + neutral

    if (all === 0) return <p>No feedback given.</p>

    const average = good - bad
    const positive = (good / all * 100) + "%"

    return (<table><tbody>
        <Stats type={"good"} num={good}/>
        <Stats type={"neutral"} num={neutral} />
        <Stats type={"bad"} num={bad} />
        <Stats type={"all"} num={all} />
        <Stats type={"average"} num={average} />
        <Stats type={"positive"} num={positive} />
    </tbody></table>)
}

const Heading = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const Stats = (props) => <tr><th>{props.type}</th><td>{props.num}</td></tr>


export default App

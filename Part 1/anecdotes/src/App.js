import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

    const reset = () => {
        setSelected(Math.floor(Math.random() * (anecdotes.length-1)) + 1)
    }

    const vote = () => {
        let newPoints = [...points]
        newPoints[selected] += 1
        setPoints(newPoints)
    }

    const findMax = () => {
        let maxPos = -1
        let max = -1

        for (let i = 0; i < points.length; i++) {
            if (points[i] > max) {
                max = points[i]
                maxPos = i
            }
        }
        return maxPos
    }

    const maxQuote = findMax()

    return (
        <>
            <Heading text={"Anecdote of the day"}/>
            <Text text={anecdotes[selected]} />
            <Button onClick={reset} text={"Reset"} />
            <Button onClick={vote} text={"Vote"} />

            <Heading text={"Most popular anecdote"}/>
            <Text text={anecdotes[maxQuote]} />
        </>
    )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const Heading = (props) => <h1>{props.text}</h1>
const Text = (props) => <p>{props.text}</p>

export default App

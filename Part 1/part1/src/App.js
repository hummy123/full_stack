import React from 'react'

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    let total = 0
    for (const part of parts) {
        total += part.exercises
    }

    return (
      <>
          <Header course={course} />
          <Content parts={parts} />
          <Total sum={total} />
      </>
  )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    const parts = props.parts.map(part => <Part key={part.name} part={part} /> )
    return (
        <>
            {parts}
        </>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.sum}</p>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

export default App

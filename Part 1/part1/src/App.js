import React from 'react'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
      <>
          <Header course={course} />
          <Content p1={part1} p2={part2} p3={part3} />
          <Total sum={part1.exercises + part2.exercises + part3.exercises} />
      </>
  )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
            <Part object={props.p1} />
            <Part object={props.p2} />
            <Part object={props.p3} />
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
        <p>{props.object.name} {} {props.object.exercises}</p>
    )
}

export default App

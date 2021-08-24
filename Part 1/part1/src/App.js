import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
      <>
          <Header course={course} />
          <Content p1={part1} e1={exercises1} p2={part2} e2={exercises2} p3={part3} e3={exercises3} />
          <Total sum={exercises1 + exercises2 + exercises3 }/>
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
            <Part name={props.p1} exercises={props.e1} />
            <Part name={props.p2} exercises={props.e2} />
            <Part name={props.p3} exercises={props.e3} />
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
        <p>{props.name} {props.exercises}</p>
    )
}

export default App

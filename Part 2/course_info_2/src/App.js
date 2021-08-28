import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    //console.log(course.parts[0].exercises)
    const sum = course.parts.reduce((s, p) => ({ exercises: s.exercises + p.exercises}))
    return(
        <p>Number of exercises {sum.exercises}</p>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.name} part={part}/>)}
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return <Course course={course} />
}

const Course = ({course}) => {
    return(<>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </>)
}

export default App

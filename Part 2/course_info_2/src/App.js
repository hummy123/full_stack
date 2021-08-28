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
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return <Course key={"test"} courses={courses} />
}

const Course = ({courses}) => {
    const courseInfo = courses.map(course => {
        return (<React.Fragment key={course.name}>
            <Header key={new Date().getMilliseconds()} course={course} />
            <Content key={new Date().getTime()} course={course} />
            <Total key={new Date().getSeconds()} course={course} />
        </React.Fragment>)
    })
    return(<>
        {courseInfo}
    </>)
}

export default App

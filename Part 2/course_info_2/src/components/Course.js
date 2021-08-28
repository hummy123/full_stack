import React from 'react';

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

export default Course

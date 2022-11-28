const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part, idx) => 
          <Part key={idx} part={part} />
        )}
      </ul>
      <p><strong>total of {sumExercises(course.parts)} exercises</strong></p>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const sumExercises = (parts) => {
  return parts.reduce((sum, curntPart) => {
    return sum + curntPart.exercises;
  }, 0)
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

  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App
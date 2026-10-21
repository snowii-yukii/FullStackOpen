const Header = (props) => <h1>{props.course.name}</h1>

const Course = ({ course }) => (
  course.parts.map((part) => <li key={part.id}>{part.name} {part.exercises}</li>)
)

const Total = ({ course }) => {
  const total = course.parts.reduce((acummulator, part) => {
    return acummulator + part.exercises
  }, 0)
  return (
    <h4>total of {total} exercises</h4>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      },
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Course course={course} />
      <Total course={course} />
      
    </div>
  )
}

export default App
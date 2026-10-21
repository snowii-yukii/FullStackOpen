const Header = (props) => <h1>{props.course.name}</h1>

const Course = ({ course }) => (
  course.parts.map((part) => <li key={part.id}>{part.name} {part.exercises}</li>)
)

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
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Course course={course} />
      
      
    </div>
  )
}

export default App
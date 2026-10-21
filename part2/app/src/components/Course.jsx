const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    ))}
  </ul>
)

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises
  }, 0)
  return <h4>total of {total} exercises</h4>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
import { useState } from 'react'

const Button = ({ text, handleClick }) => {

  return(
    <>
      <button onClick={handleClick} >
        {text}
      </button>
    </>
  )
}

const StatisticLine =  ({ text, value }) => {

   return (
        <tr>
          <td>{text}</td><td>{value}</td>
        </tr>
   )
}

const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total
  const positive = total === 0 ? 0 : (good / total) * 100
  
  return (
    <>
      <h3>Statistics</h3>
      {total === 0 ? (
        <p>No feedback given</p>
      ) :
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </div>
      }
    </>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Give Feedback</h3>

      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
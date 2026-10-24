import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName }

    if(persons.some(person => person.name === newName))  return alert(`${newName} is already added to the phonebook`)
    setPersons(persons.concat(personObject))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Names</h2>
      <ul>
        {persons.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
      </ul>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
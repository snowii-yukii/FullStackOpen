import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '123123'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName, number: newNumber}

    if(persons.some(person => person.name === newName))  return alert(`${newName} is already added to the phonebook`)
    setPersons(persons.concat(personObject))
  }

  const filtered = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with a <input onChange={(e) => setSearch(e.target.value)}/></div>
      {filtered.map((filtered) => (
        <li key={filtered.name}>{filtered.name}</li>
      ))}
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input onChange={(e) => setNewNumber(e.target.value)}/>
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
        {persons.map((person) => (
          <li key={person.name}>{person.number}</li>
      ))}
    </div>
  )
}

export default App
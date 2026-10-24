import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      filter shown with a <input value={search} onChange={handleSearchChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  )
}

const Numbers = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.number}
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
    .get()
    .then((initialPersons) => {
      setPersons(initialPersons)
    })
  },[])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to the phonebook`)
    }

    personService
      .post(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearch(e.target.value)

  const filtered = persons.filter((person) => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Persons persons={filtered} />
      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Persons</h3>
      <Persons persons={persons} />

      <h3>Numbers</h3>

      <Numbers persons={persons} />
    </div>
  )
}

export default App
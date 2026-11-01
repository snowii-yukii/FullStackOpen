import { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({ persons, search, handleSearchChange }) => {
  return (
    <div>
      filter shown with a <input value={search} onChange={handleSearchChange} />
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
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

const Persons = ({ persons, remove }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => remove(person.id, person.name)}>Delete</button>
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

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, type } = notification

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

   const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .get()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName, number: newNumber }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            notify(`Updated '${returnedPerson.name}'`, 'success')
          })
          .catch(error => {
            notify(error.response.data.error, 'error')
          })
      }
      return
    }

    personService
      .post(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notify(`Added '${returnedPerson.name}'`, 'success')
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearch(e.target.value)

  const filtered = persons.filter((person) => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notify(`Deleted '${name}'`, 'success')
        })
        .catch(error => {
          notify(error.response.data.error, 'error')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter persons={filtered} search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Persons</h3>
      <Persons persons={filtered} remove={deletePerson} />

      <h3>Numbers</h3>

      <Numbers persons={filtered} />
    </div>
  )
}

export default App
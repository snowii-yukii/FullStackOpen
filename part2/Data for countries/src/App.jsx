import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const getAll = async () => {
    const request = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    setCountries(request.data)
  }

  useEffect(() => {
    getAll()
  }, [])

  const handleSearchChange = (e) => setSearch(e.target.value)

  const filteredCountries = countries.filter((country) => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries <input type="text" value={search} onChange={handleSearchChange} />
      </div>

      {search === '' ? (
        <p>Type to start searching...</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
            </li>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.cca3}>
              <h2>{country.name.common}</h2>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>

              <h3>languages:</h3>
              <ul>
                {Object.values(country.languages || {}).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>

              <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                width="150" 
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  )
}

export default App
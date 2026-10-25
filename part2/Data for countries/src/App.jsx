import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!capital) return

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Error fetching weather:', error)
      })
  }, [capital, api_key])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} °C</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description} 
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

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
              <button onClick={() => setSearch(country.name.common)}>Show</button>
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

              <Weather capital={country.capital} />
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
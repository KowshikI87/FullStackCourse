import { useState} from 'react'
import axios from 'axios'

/*
  I don't know how to send multiple request inside the app component
  so i am retrieving data from the server once. And then once we have the data for country,
  we just filter it using filter text
*/

let allCountrysInfo;

const getAllCountrysInfo = () => {
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => {
    allCountrysInfo = response.data
  })
}

getAllCountrysInfo();

const ShowCountrysInfo = ( {countries} ) => {
  //Case 1: No Data is Pulled
  if (!countries || countries.length === 0) {
    return (
      <div>
      </div>
    )
  }

  //Case 2: Only One Country Matches Filter
  if (countries.length === 1) {
    return (
      <div>
        <ShowCountryInfo country={countries[0]} />
      </div>
    )
  }

  //Case 3: Multiple Countries Matches Filter
  return (
    <div>
      {countries.map((country, idx) => {
        return (
          <ListCountry key={idx} country={country} />
        )
      })}
    </div>
  )
}

const ListCountry = ( {country} ) => {
  return (
    <div>
      <form onSubmit={(event) => handleShowCountry(event, country)}>
        <p>{country.name.common}
          <button type="submit">show</button>
        </p>
      </form>
    </div>
  )
}

const handleShowCountry = (event, country) => {
  event.preventDefault();
  alert(`country name is ${country.name.common}`);
  return (
    <ShowCountryInfo country={country} />
  )
}

const ShowCountryInfo = ( {country} ) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p> capital {country.capital[0]}</p>
      <p> area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, idx) =>
          <Language key={idx} lang={language} />
        )}
      </ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  )
}

const Language = ( {lang} ) => {
  return (
    <li>{lang}</li>
  )
}

const App = () => {
  const [newCountryFilter, setNewCountryFilter] = useState('')
  const [countriesInfo, setCountryInfo] = useState([]);

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountryInfo(response.data)
    })
  }

  const handleCountryFilterChange = (event) => {
    let filteredCountries = allCountrysInfo.filter(country => {
      let countryName = country.name.common.toUpperCase()
      let filterName = newCountryFilter.toUpperCase()
      return countryName.startsWith(filterName)
    })

    setNewCountryFilter(event.target.value)
    setCountryInfo(filteredCountries);
  }

  return (
    <div>
      <form>
        <p>find countries 
          <input
            value={newCountryFilter}
            onChange={handleCountryFilterChange}>
          </input>
        </p>
      </form>
      <ShowCountrysInfo countries={countriesInfo} />
    </div>
  )
}

export default App
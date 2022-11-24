import { useState, useEffect } from 'react'
import axios from 'axios'

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

//do the part about showing countries info when clicked on "show"
//in a later part
const ListCountry = ( {country} ) => {
  return (
    <div>
      <form onSubmit={handleShowCountry}>
        <p>{country.name.common}
          <button type="submit">show</button>
        </p>
      </form>
    </div>
  )
}

//don't know how to pass name of country as well
//need to have event object to prevent default action
const handleShowCountry = (event) => {
  console.log("inside handleShowCountry")
  alert("trying to show countries info but can't")
  event.preventDefault();
  //not sure how to do this one below
  // return (
  //   <ShowCountryInfo country={country} />
  // )
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

//filter list of objects if country name starts with filter text
const filterCountry = () => {
  return undefined;
}

const App = () => {
  const [newCountryFilter, setNewCountryFilter] = useState('')
  const [countriesInfo, setCountryInfo] = useState([]);

  const handleCountryFilterChange = (event) => {
    setNewCountryFilter(event.target.value)
  }


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryInfo(response.data)
      })
  }, [])

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
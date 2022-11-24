import { useState } from 'react'

const AddNewMember = ( {newName, newPhoneNumber,
  handleNameChange, handleAddName, handlePhoneNumberChange} ) => {
  return (
    <div>
      <h2>add a new </h2>
      <form onSubmit={handleAddName}>
        <div>
          <p>name:
          <input 
            value={newName}
            onChange={handleNameChange}
          /></p>
          <p>phone number:
          <input 
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
          /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = ( {persons, nameFilter} ) => {
  let filteredPersons
  if (nameFilter.length === 0) {
    filteredPersons = persons;
  } else {
    filteredPersons = persons.filter(person => {
      let lowerCaseNameFilter = nameFilter.toLowerCase()
      let lowerCaseName = person.name.toLowerCase();
      return lowerCaseName.startsWith(lowerCaseNameFilter);
    })
  }

  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person, idx) => 
        <Member key={idx} name={person.name} phoneNumber={person.phoneNumber}/>
      )}
    </div>
  )
}

const Member = ( {name, phoneNumber} ) => {
  return (
    <p>
      {name} {phoneNumber}
    </p>
  )
}

const NameFilter = ( {newNameFilter, handleNameFilterChange} ) => {
  return (
    <div>
      <form>
        <p>filter shown with
          <input
          value={newNameFilter}
          onChange={handleNameFilterChange}>
          </input>
        </p>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value)
  }

  const handleAddName = (event) => {
    event.preventDefault();
    let isCurntNameExist = persons.some(person => {
      return person.name === newName
    })

    if (isCurntNameExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, phoneNumber: newPhoneNumber}))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <NameFilter newNameFilter={newNameFilter} handleNameFilterChange={handleNameFilterChange} />

      <AddNewMember newName={newName} newPhoneNumber={newPhoneNumber}
      handleNameChange={handleNameChange} handleAddName={handleAddName} 
      handlePhoneNumberChange={handlePhoneNumberChange} />

      <Numbers persons={persons} nameFilter={newNameFilter} />

    </div>
  )
}

export default App
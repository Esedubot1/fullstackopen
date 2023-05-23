import { useState } from 'react'

const FilterForm = (props) => {
  console.log(props)
  return (
    <div>
      filter shown with: <input onChange={props.handleFilterChange}/>
    </div>
  )
}

const Person = (props) => {
  console.log(props)
  return (
    <p>{props.name} {props.number}</p>
  )
}

const People = (props) => {
  console.log(props)
  return (
    <div>
      {props.list.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map(person =>
        <Person key={person.name} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    const names = persons.map(p => {
      return p.name
    })
    if(names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People list={persons} filter={filter}/>
    </div>
  )

}

export default App
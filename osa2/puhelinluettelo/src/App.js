import { useState, useEffect } from 'react'
import axios from 'axios'
import dataService from './services/persons'

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
    <div>
      {props.person.name} {props.person.number}
      <input type='button' value='delete' onClick={() => {
        console.log(props.person.id)
        axios.delete(`http://localhost:3001/persons/${props.person.id}`).then(response => {
          console.log(response)
          window.location.reload()
        })
      }}/>
    </div>
  )
}

const People = (props) => {
  console.log(props)
  return (
    <div>
      {props.list.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map(person =>
        <Person key={person.name} person={person}/>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    dataService.getAll().then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      console.log(persons)
    })
  }, [])

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

    dataService.create(person).then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
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
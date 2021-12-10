import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [aMessage, setAMessage] = useState([null, true])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService
        .update(person.id, changedPerson)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setAMessage([`Changed ${returnedPerson.name}'s number `, true])
          setTimeout(() => {
            setAMessage([null, true])
          }, 5000)  
        })    
      }
    } else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setAMessage([`Added ${returnedPerson.name} `, true])
        setTimeout(() => {
          setAMessage([null, true])
        }, 5000)
      })
    }
  }

  const handleShowAll = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }  
  
  const personsToShow = (showAll === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  const deletePersonOf = person => {
    const deleteId = person.id
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(deleteId)
          .then(setPersons(persons.filter(person => person.id !== deleteId)))
          .catch(error => {
            setAMessage([`Information of ${person.name} has already been removed from server `, false])
            setTimeout(() => {
              setAMessage([null, true])
            }, 5000)        
          })
          setAMessage([`${person.name} deleted `, true])
          setTimeout(() => {
            setAMessage([null, true])
          }, 5000)      
    }
  }

    
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={aMessage} />
      <Filter value={showAll} onChange={handleShowAll} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addName}
        value1={newName} onChange1={handleNameChange}
        value2={newNumber} onChange2={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePersonOf(person)}
          />
        )} 
      </ul>
    </div>
  )

}

export default App
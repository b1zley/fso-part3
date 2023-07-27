import { useState, useEffect } from 'react'

import PersonList from './components/PersonList.js'

import AddANewPerson from './components/AddANewPerson.js'

import SearchByName from './components/SearchByName.js'

import Notification from './components/Notification.js'



import personServices from './services/persons.js'


const App = () => {

  const [persons, setPersons] = useState([])

  const [personsToShow, setPersonsToShow] = useState(persons)

  const [toSearch, setToSearch] = useState('')

  const [message, setMessage] = useState(null)


  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response)
        setPersonsToShow(response)
        setToSearch('')
      }
      )
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}/>
      <div>
        <h2>Search</h2>
        <div>
          Filter shown with:
          <SearchByName
            persons={persons}
            setPersonsToShow={setPersonsToShow}
            toSearch={toSearch}
            setToSearch={setToSearch}
            getAll = {personServices.getAll()}

          />
        </div>
      </div>
      <div>
        <h2>Add a new</h2>
        <AddANewPerson
          persons={persons}
          setPersons={setPersons}
          setPersonsToShow={setPersonsToShow}
          personsToShow={personsToShow}
          toSearch={toSearch}
          setToSearch={setToSearch}
          create={personServices.create}
          update={personServices.update}
          setMessage ={setMessage}
        />
      </div>
      <h2>Numbers</h2>
      <PersonList
        setPersons = {setPersons}
        setPersonsToShow={setPersonsToShow}
        setToSearch = {setToSearch}
        personList={personsToShow}
        persons={persons}
        
        removePerson={personServices.removePerson}
        setMessage={setMessage}
        
        />
        
    </div>
  )
}

export default App

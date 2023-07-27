import RemovePersonButton from './RemovePersonButton.js'


const PersonList = ({ personList, removePerson , setPersons , setPersonsToShow 
  , setToSearch ,getAll ,persons, setMessage
}) => {
  return (
    <ul>
      {personList
        .sort((a, b) =>
          a.name.localeCompare(b.name))
        .map(
          (person) =>
            <li key={person.id}> {person.name} {person.number}
              <RemovePersonButton
                personList={personList}
                persons={persons}
                removePerson={removePerson}
                person={person}
                setPersons = {setPersons}
                setPersonsToShow = {setPersonsToShow}
                setToSearch = {setToSearch}
                getAll = {getAll}
                setMessage = {setMessage}
              />
            </li>
        )}
    </ul>
  )
}

export default PersonList
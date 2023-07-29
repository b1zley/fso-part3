import NewNameTracker from './NewNameTracker'
import NewNumberTracker from './NewNumberTracker'

import { useState } from 'react'






const AddANewPerson = (props) => {



    const [newName, setNewName] = useState('')


    const [newNumber, setNewNumber] = useState('')

    const isNameAdded = (name) => {
        for (let i = 0; i < props.persons.length; i++) {
            if (name === props.persons[i].name) {
                return true
            } else {
            }

        }
        return false

    }

    const isNameBlank = (name) => {
        if (name === "") {
            return true
        } else { return false }
    }




    const addNewPerson = (event) => {
        event.preventDefault()
        let personToChangeId


        if (isNameAdded(newName) === true) {
            if (window.confirm(
                "This name has been added already, update with new number?")
            ) {
                personToChangeId = props.persons
                    .filter(person => person.name === newName)
                    .map(person => person.id)

                const updatedPerson = {
                    name: newName,
                    number: newNumber,
                    id: personToChangeId[0]
                }

                const handleUpdate = () => {
                    let indexToChange = props.persons
                            .map(person => person.id)
                            .indexOf(personToChangeId[0])


                        const newArray = [...props.persons]
                        newArray[indexToChange] = updatedPerson

                        console.log(newArray)
                        props.setPersons(newArray)
                        props.setPersonsToShow(newArray)
                        setNewName('')
                        setNewNumber('')
                }

                props.update(personToChangeId, updatedPerson)
                    .then(returnedPerson => {

                        handleUpdate()
                        // let indexToChange = props.persons
                        //     .map(person => person.id)
                        //     .indexOf(personToChangeId[0])


                        // const newArray = [...props.persons]
                        // newArray[indexToChange] = updatedPerson

                        // console.log(newArray)
                        // props.setPersons(newArray)
                        // props.setPersonsToShow(newArray)
                        // setNewName('')
                        // setNewNumber('')

                        props.setMessage(`Updated ${newName}`)
                        setTimeout(() => {
                            props.setMessage(null)
                        }, 5000)
                        props.setToSearch('')
                        

                    })
                    .catch(error => {
                        props.setMessage(`Information of ${newName} already removed`)
                        setTimeout(() => {
                            props.setMessage(null)
                        }, 5000)
                        console.log(error)
                        const updatedPersonsList = 
                            props.persons
                                .filter(person => person.id !==personToChangeId[0])
                        props.setPersons(updatedPersonsList)
                            
                        props.setPersonsToShow(updatedPersonsList)

                        setNewName('')
                        setNewNumber('')
                        props.setToSearch('')
                            
                    })








                // props.update(personToChangeId, updatedPerson)


                // console.log(props.persons)

                // let indexToChange = props.persons
                //     .map(person => person.id)
                //     .indexOf(personToChangeId[0])


                // const newArray = [...props.persons]
                // newArray[indexToChange] = updatedPerson

                // console.log(newArray)
                // props.setPersons(newArray)
                // props.setPersonsToShow(newArray)
                // setNewName('')
                // setNewNumber('')

                // props.setMessage(`Updated ${newName}`)
                // setTimeout(() => {
                //     props.setMessage(null)
                // }, 5000)










            }

        } else if (isNameAdded(newName) === false) {
            const personToAdd = {

                name: newName,
                number: newNumber

            }

            props
                .create(personToAdd)
                .then(response => {
                    props.setPersons(props.persons.concat(response))
                    props.setPersonsToShow(props.persons.concat(response))
                    props.setToSearch('')
                    setNewName('')
                    setNewNumber('')
                })
            props.setMessage(`Added ${newName}`)
            setTimeout(() => {
                props.setMessage(null)
            }, 5000)

        }
    }


    return (
        <form onSubmit={addNewPerson} >

            <NewNameTracker newName={newName} setNewName={setNewName} />
            <NewNumberTracker newNumber={newNumber} setNewNumber={setNewNumber} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}





export default AddANewPerson
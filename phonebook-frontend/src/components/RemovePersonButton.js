


const RemovePersonButton = (
    props

    // person,
    // persons,
    // setPersons,
    // personsToShow,
    // setPersonsToShow,
    // removePerson

) => {

    const handleClick = (event) => {
        if (window.confirm("Really delete this entry?")) {
            console.log(props.personsList)
            props.removePerson(props.person.id)

            props.setPersons(props.persons.filter(person => person.id !== props.person.id))
            props.setPersonsToShow(props.personList.filter(person => person.id !== props.person.id))

            props.setMessage(`Deleted ${props.person.name}`)
            setTimeout(
                () =>{
                    props.setMessage(null)
                }, 5000
            )



        }





    }




    return (
        <>
            <button

                onClick={handleClick}>
                delete
            </button>
        </>
    )
}

export default RemovePersonButton
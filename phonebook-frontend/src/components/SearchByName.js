


const SearchByName = (props) => {

    
    
    const newSearchInputChange = (event) => {

        
      

        props.setToSearch(event.target.value)
    
        let searchTerm = event.target.value.toLowerCase()
    
        let resultWords = props.persons.filter(person =>
          person.name.toLowerCase().includes(searchTerm))
        props.setPersonsToShow(resultWords)

    
      }

    return (
        <input
            value={props.toSearch}
            onChange={newSearchInputChange}
        />
    )
}



export default SearchByName
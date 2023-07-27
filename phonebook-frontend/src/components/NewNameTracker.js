
const NewNameTracker = (props) => {


    



    const newNameInputChange = (event) => {
        props.setNewName(event.target.value)
    
      }

    return(
        <div>
            name:
            <input
              value={props.newName}
              onChange={newNameInputChange}
            />
          </div>
    )

}


export default NewNameTracker
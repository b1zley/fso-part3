
const NewNumberTracker = (props) => {




    const newNumberInputChange = (event) => {
      props.setNewNumber(event.target.value)
    }
    return (
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={newNumberInputChange}
        />
      </div>
    )
  }
  export default NewNumberTracker
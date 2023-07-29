require('dotenv').config()

const mongoose = require('mongoose')


function addNewPersonToDB(processArray) {
    console.log('in add new person')
    
    
    const password = processArray[2]

    const nameToAdd = processArray[3]

    const numberToAdd = processArray[4]

    // console.log('password: ', password)
    // console.log('nameToAdd: ', nameToAdd)
    // console.log('numberToAdd: ', numberToAdd)

    const url = process.env.MONGODB_URI
        

    
    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)


    const person = new Person({
        name: nameToAdd,
        number: numberToAdd
    })

    console.log(person)

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}


function listPhonebook(){
    console.log('in list phonebook')

    const password = process.argv[2]

    const url =
        `mongodb+srv://josh0:${password}@johagan1.czvgrtx.mongodb.net/noteApp?retryWrites=true&w=majority`

    



    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result =>{
        console.log(`phonebook contains ${result.length} people`)
        result.forEach( result => {
            console.log(`${result.name} ${result.number}`)
        })
        mongoose.connection.close()
    })

}



if (process.argv.length === 3) {
    console.log('list phonebook')
    listPhonebook()

    
} else if (process.argv.length === 5) {
    console.log('add new person')
    addNewPersonToDB(process.argv)
} else {
    console.log('please input password to list phonebook, please input password, name to add and number to add to add a new entry!')
    
}





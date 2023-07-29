require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')




app.use(cors())

morgan.token('json-data', function (req, res) {
    const toReturn = JSON.stringify(req.body)
    return toReturn
})


app.use(express.json())


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-data', {
    skip: function (req, res) { return req.method !== 'POST' }
}))

app.use(morgan('tiny'))

app.use(express.static('build'))


persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]



app.get('/', (request, response) => {
    response.send('<b>Hello bitches</b>')

})


app.get('/api/persons', (request, response, next) => {

    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})




app.get('/info', (request, response) => {
    let currentDate = new Date()
    let toReturn = 'blank'


    Person.find({})
        .then(persons => {
            numberEntriesInPhonebook = persons.length
            toReturn =
                `<div>Phonebook has info for ${numberEntriesInPhonebook} people</div>`
                + `<div>${currentDate}</div> `

            response.send(toReturn)

                
        })


})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {

            if (result) {
                console.log('deletion successful')
            } else {
                console.log('deletion unsuccessful, object not found')
            }
            response.status(204).end()
        })
        .catch(error => next(error))
})




app.post('/api/persons', (request, response, next) => {

    const nameToAdd = request.body.name
    const numberToAdd = request.body.number
    let personAlreadyAdded = false
    if (!nameToAdd) {
        return (
            response.status(400).json({
                error: 'name missing'
            })
        )

    } else if (!numberToAdd) {

        return (
            response.status(400).json({
                error: 'number missing'
            })
        )
    } else if (personAlreadyAdded === true) {
        console.log('person already added')
        return (

            response.status(400).json({
                error: 'person already added'

            })
        )

    } else {

        const personToAdd = new Person({
            name: nameToAdd,
            number: numberToAdd
        })

        personToAdd.save()
            .then(savedPerson => {
                response.json(savedPerson)
            })
            .catch(error => next(error))


    }



})

app.put('/api/persons/:id', (request, response, next) => {

    const nameToUpdate = request.body.name
    const numberToUpdate = request.body.number

    const person = {
        name: nameToUpdate,
        number: numberToUpdate
    }


    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => { next(error) })

})




const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknownEndpoint' })
}


app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {

    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
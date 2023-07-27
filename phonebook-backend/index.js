const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()


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


app.get('/api/persons', (request, response) => {

    response.json(persons)

})

const infoPage = () => {
    let currentDate = new Date()


    let toReturn =
        `<div>Phonebook has info for ${persons.length} people</div>`
        + `<div>${currentDate}</div> `
    return (
        toReturn

    )
}


app.get('/info', (request, response) => {
    response.send(infoPage())


})

app.get('/api/persons/:id', (request, response) => {
    const idToGet = Number(request.params.id)
    const personToGet = persons.find(person => person.id === idToGet)
    if (!personToGet) {
        response.status(404).end()
    } else {

        response.json(personToGet)
    }
})


app.delete('/api/persons/:id', (request, response) => {
    const idToDelete = Number(request.params.id)
    console.log(idToDelete)

    persons = persons.filter(person => person.id !== idToDelete)

    response.status(204).end()


})


app.post('/api/persons', (request, response) => {

    const nameToAdd = request.body.name
    const numberToAdd = request.body.number

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
    } else if (persons.find(person => person.name === nameToAdd)) {
        return (
            response.status(400).json({
                error: 'person already added'
            })
        )

    } else {
        const idToAdd = Math.floor(Math.random() * 999999999)


        const personToAdd =
        {
            "id": idToAdd,
            "name": nameToAdd,
            "number": numberToAdd

        }
        persons = persons.concat(personToAdd)

        response.json(personToAdd)
    }



})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
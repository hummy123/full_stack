const express = require('express')
const {response} = require("express");
const app = express()

app.use(express.json())

let contacts = [
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

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

function generateID() {
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'contact name or contact number missing'
        })
    }

    const exists = contacts.find(contact => contact.name === body.name)

    if (exists) return response.status(400).json
    ({error: 'name must be unique'})

    const contact = {
        name: body.name,
        number: body.number,
        id: generateID()
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)
    if (contact)
        response.json(contact)
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has entries for ${contacts.length} people.</p>
    <p>${new Date().toString()}</p>`)
})

const PORT = 3001
app.listen(PORT)

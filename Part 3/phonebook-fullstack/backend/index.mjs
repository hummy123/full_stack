import Models from './models/models.mjs'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config() //get environment variables

//store db url from env variable
Models.setUrl(process.env.MONGODB_URI)

//express server
const app = express()

//middleware used with express
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

//token to get the request body
morgan.token('body', function (req) { return JSON.stringify(req.body) })

/* token for 'tiny' configuration (as stated on docs) with ':body' appended to show request body
 * not specifying 'tiny' as format because that is incompatible with additional tokens */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', async (request, response) => {
	const contactList = await Models.getAll()
	response.json(contactList)
})

app.post('/api/persons', async (request, response, next) => {
	try {
		const body = request.body
		const result = await Models.save(body.name, body.number)
		response.json(result)
	} catch (err) {
		next(err)
	}
})

app.get('/api/persons/:id', async (request, response, next) => {
	try {
		const contact = await Models.find(request.params.id)
		if (contact) response.json(contact)
		else response.status(404).end()
	} catch (err) {
		next(err)
	}
})

app.put('/api/persons/:id', async (request, response, next) => {
	try {
		const result = await Models.update(
			request.params.id,
			request.body.number)
		response.json(result)
	} catch (err) {
		next(err)
	}
})

app.delete('/api/persons/:id', async (request, response) => {
	await Models.delete(request.params.id)
	response.status(204).end()
})

app.get('/info', async (request, response) => {
	const contacts = await Models.getAll()
	response.send(`<p>Phonebook has entries for ${contacts.length} people.</p>
    <p>${new Date().toString()}</p>`)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)

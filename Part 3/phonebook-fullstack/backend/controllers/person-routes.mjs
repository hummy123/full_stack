import {Router} from 'express'
import Models from '../models/models.mjs'

const personsRouter = Router()

personsRouter.get('/', async (request, response) => {
	const contactList = await Models.getAll()
	response.json(contactList)
})

personsRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body
		const result = await Models.save(body.name, body.number)
		response.json(result)
	} catch (err) {
		next(err)
	}
})

personsRouter.get('/:id', async (request, response, next) => {
	try {
		const contact = await Models.find(request.params.id)
		if (contact) response.json(contact)
		else response.status(404).end()
	} catch (err) {
		next(err)
	}
})

personsRouter.put('/:id', async (request, response, next) => {
	try {
		const result = await Models.update(
			request.params.id,
			request.body.number)
		response.json(result)
	} catch (err) {
		next(err)
	}
})

personsRouter.delete('/:id', async (request, response) => {
	await Models.remove(request.params.id)
	response.status(204).end()
})

export default personsRouter

import models from '../models/models.js'
import {Router} from 'express'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
	const result = await models.findAll()
	response.json(result)
})

blogRouter.post('/', async (request, response) => {
	try {
		const result = await models.save(request.body)
		response.status(201).json(result)
	} catch (err) {
		response.status(400).end()
	}
})

blogRouter.delete('/:id', async (request, response) => {
	await models.remove(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const id = request.params.id
	const result = await models.update(id, request.body)
	response.json(result)
})

export default blogRouter

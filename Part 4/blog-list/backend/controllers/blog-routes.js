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

export default blogRouter

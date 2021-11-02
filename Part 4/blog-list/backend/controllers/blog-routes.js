import models from '../models/blogs.js'
import {Router} from 'express'
import {userExtractor} from '../utils/middleware.js'
import logger from '../utils/logger.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
	const result = await models.findAll()
	response.json(result)
})

blogRouter.post('/', userExtractor, async (request, response) => {
	console.log(request.body)
	try {
		const result = await models.save(request.body)
		response.status(201).json(result)
	} catch (err) {
		logger.error(err)
		response.status(400).json(err)
	}
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
	try {
		await models.remove(request.params.id, request.body.user)
		response.status(204).end()
	} catch (err) {
		logger.error(err)
		response.status(401).json(err)
	}
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
	const id = request.params.id
	console.log(request.body)
	try {
		const result = await models.update(id, request.body)
		response.json(result)
	} catch (err) {
		logger.error(err)
		response.status(401).json(err)
	}
})

export default blogRouter

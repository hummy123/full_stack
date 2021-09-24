import models from '../models/blogs.js'
import {Router} from 'express'
import {userExtractor} from '../utils/middleware.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
	const result = await models.findAll()
	response.json(result)
})

blogRouter.post('/', userExtractor, async (request, response) => {
	try {
		const result = await models.save(request.body)
		response.status(201).json(result)
	} catch (err) {
		response.status(400).json(err.message)
	}
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
	const result = await models.remove(request.params.id, request.body.user)
	if (!result) response.status(401).json({error: 'unauthorised'})
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const id = request.params.id
	const result = await models.update(id, request.body)
	response.json(result)
})

export default blogRouter

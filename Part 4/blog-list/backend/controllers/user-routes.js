import {Router} from 'express'
import models from '../models/users.js'

const userRouter = Router()

userRouter.get('/', async (request, response) => {
	const result = await models.allUsers()
	response.json(result)
})

userRouter.post('/', async (request, response) => {
	try {
		const result = await models.newUser(request.body)
		response.json(result)
	} catch (err) {
		response.status(400).json({error: `${err.name} ${err.message}`})
	}
})

export default userRouter

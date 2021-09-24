import {Router} from 'express'
import models from '../models/users.js'

const userRouter = Router()

userRouter.get('/', async (request, response) => {
	const result = await models.allUsers()
	response.json(result)
})

userRouter.post('/', async (request, response) => {
	if (request.body.password.length < 3)
		return response.status(400).json({error: 'password must contain at least 3 characters'})

	try {
		const result = await models.newUser(request.body)
		response.json(result)
	} catch (err) {
		response.status(400).json({error: `${err.name} ${err.message}`})
	}
})

export default userRouter

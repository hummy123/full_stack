import jwt from 'jsonwebtoken'
import user from '../models/users.js'
import bcrypt from 'bcrypt'
import {Router} from 'express'
import {SECRET} from '../utils/config.js'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
	const body = request.body

	const curUser = await user.findByUsername(body.username)
	const authenticated = (curUser === null)
		? false
		: await bcrypt.compare(body.password, curUser.password) //second argument is a hash stored in db

	if (!(curUser && authenticated)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: curUser.username,
		id: curUser._id
	}

	const token = jwt.sign(userForToken, SECRET)

	response.status(200)
		.send({token, username: curUser.username, name: curUser.name})
})

export default loginRouter

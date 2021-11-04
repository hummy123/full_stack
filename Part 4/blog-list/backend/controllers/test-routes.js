import {Router} from 'express'
import blogs from '../models/blogs.js'
import users from '../models/users.js'

const router = Router()

router.post('/reset', async (request, response) => {
	await blogs.deleteAll()
	await users.deleteAll()

	response.status(204).end()
})

export default router

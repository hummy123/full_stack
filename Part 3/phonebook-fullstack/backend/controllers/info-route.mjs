import {Router} from 'express'
import Models from '../models/models.mjs'

const infoRouter = Router()
infoRouter.get('/', async (request, response) => {
	const contacts = await Models.getAll()
	response.send(`<p>Phonebook has entries for ${contacts.length} people.</p>
    <p>${new Date().toString()}</p>`)
})

export default infoRouter

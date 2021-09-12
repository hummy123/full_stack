import mongoose from 'mongoose'
import {MONGODB_URI} from '../utils/config.js'
import logger from '../utils/logger.js'

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const findAll = async () => {
	await connect()
	const result = await Blog.find()
	await close()
	return result
}

const save = async (request) => {
	//convert request to Blog schema
	const blog = new Blog(request)

	//connect to db, save and close connection
	await connect()
	const result = await blog.save()
	await close()
	return result
}

const connect = async () => {
	//connect to db
	try {
		await mongoose.connect(`${MONGODB_URI}`)
		logger.info('connected to db')
	} catch (err) {
		logger.error('error connecting to db:', err.message)
	}
}

//function to close db
const close = async () => {
	await mongoose.connection.close()
}

export default {findAll, save}

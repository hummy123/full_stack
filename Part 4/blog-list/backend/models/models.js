import mongoose from 'mongoose'
import {MONGODB_URI} from '../utils/config.js'
import logger from '../utils/logger.js'

const blogSchema = new mongoose.Schema({
	title: {type: String, required: true},
	author: String,
	url: {type: String, required: true},
	likes: {type: Number, default: 0}
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
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

const deleteAll = async () => {
	await connect()
	await Blog.deleteMany({})
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

export default {findAll, save, deleteAll}

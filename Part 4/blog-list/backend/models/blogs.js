import mongoose from 'mongoose'
import connection from './common.js'
import users from './users.js'

const blogSchema = new mongoose.Schema({
	title: {type: String, required: true},
	author: String,
	url: {type: String, required: true},
	likes: {type: Number, default: 0},
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
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
	await connection.connect()
	const result = await Blog.find().populate('creator')
	await connection.close()
	return result
}

const save = async (request) => {
	const usersInDB = await users.allUsers()
	request.creator = usersInDB[0]

	//convert request to Blog schema
	const blog = new Blog(request)

	//connect to db, save and close connection
	await connection.connect()
	const result = await blog.save()
	await users.linkBlogToUser(usersInDB[0].id, result.id)
	await connection.close()
	return result
}

const remove = async (id) => {
	await connection.connect()
	const result = await Blog.findByIdAndRemove(id)
	await connection.close()
	return result
}

const deleteAll = async () => {
	await connection.connect()
	await Blog.deleteMany({})
	await connection.close()
}

const update = async (id, object) => {
	await connection.connect()
	const result = await Blog.findByIdAndUpdate(id, object)
	await connection.close()
	return result
}

const findOne = async (id) => {
	await connection.connect()
	const result = await Blog.findById(id)
	await connection.close()
	return result
}

export default {findAll, save, deleteAll, remove, update, findOne}

import mongoose from 'mongoose'
import connection from './common.js'

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
	//convert request to Blog schema
	const blog = new Blog(request)

	//connect to db, save and close connection
	await connection.connect()
	const result = await blog.save()
	await connection.linkBlogAndoUser(request.user, result.id)
	await connection.close()
	return result
}

const remove = async (blogID, userID) => {
	await connection.connect()

	const curBlog = await Blog.findById(blogID)
	if (curBlog.creator.toString() === userID.toString()) {
		const result = await Blog.findByIdAndRemove(blogID)
		await connection.close()
		return result
	} else {
		await connection.close()
		return false
	}
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

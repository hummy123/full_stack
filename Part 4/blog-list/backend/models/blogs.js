import mongoose from 'mongoose'
import common from './common.js'

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
	return Blog.find().populate('creator')
}

const save = async (request) => {
	if (!request.user)
		throw new Error('not logged in')

	//convert request to Blog schema
	const blog = new Blog(request)

	const result = await blog.save()
	await common.linkBlogAndUser(request.user, result.id)
	return result
}

const remove = async (blogID, userID) => {
	const curBlog = await Blog.findById(blogID)
	await checkUser(curBlog.creator.toString(), userID)
	return Blog.findByIdAndRemove(blogID)
}

const checkUser = async (creatorID, userID) => {
	if (creatorID !== userID.toString())
		throw new Error('unauthorised')
}

const deleteAll = async () => {
	return Blog.deleteMany({})
}

const update = async (id, object) => {
	const curBlog = await Blog.findById(id)
	await checkUser(curBlog.creator.toString(), object.user)
	return Blog.findByIdAndUpdate(id, object)
}

const addLink = async (id, object) => {
	return Blog.findByIdAndUpdate(id, object)
}

const findOne = async (id) => {
	return Blog.findById(id)
}

export default {findAll, save, deleteAll, remove, update, findOne, addLink}

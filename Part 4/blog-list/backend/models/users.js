import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import connection from './common.js'

const userSchema = new mongoose.Schema({
	username: {required: true, unique: true, type: String, minlength: 3},
	password: {required: true, type: String, minlength: 3},
	name: {required: true, type: String},
	blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

const newUser = async (request) => {
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(request.password, saltRounds)

	const user = new User({
		username: request.username,
		name: request.name,
		password: passwordHash
	})

	await connection.connect()
	const result = await user.save()
	await connection.close()
	return result
}

const allUsers = async () => {
	await connection.connect()
	const result = await User.find({}).populate('blogs')
	await connection.close()
	return result
}

const deleteAll = async () => {
	await connection.connect()
	const result = await User.deleteMany({})
	await connection.close()
	return result
}

const findByUsername = async (username) => {
	await connection.connect()
	const result = await User.findOne({username: username})
	await connection.close()
	return result
}

const linkBlogToUser = async (userID, blogID) => {
	await connection.connect()
	let curUser = await User.findById(userID)
	curUser.blogs = curUser.blogs.concat(blogID)
	await curUser.save()
	await connection.close()
}

export default {newUser, allUsers, deleteAll, linkBlogToUser, findByUsername}

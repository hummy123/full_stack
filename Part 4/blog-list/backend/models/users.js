import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

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

	return user.save()
}

const updateUser = async (user) => {
	return User.findByIdAndUpdate(user.id, user)
}

const allUsers = async () => {
	return User.find({}).populate('blogs')
}

const deleteAll = async () => {
	return User.deleteMany({})
}

const findById = async (id) => {
	return User.findById(id)
}

const findByUsername = async (username) => {
	return User.findOne({username: username})
}

export default {newUser, allUsers, deleteAll, findByUsername, findById, updateUser}

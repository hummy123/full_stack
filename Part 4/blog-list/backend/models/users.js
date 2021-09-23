import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import connection from './common.js'

const userSchema = new mongoose.Schema({
	username: {required: true, unique: true, type: String, minlength: 3},
	password: {required: true, type: String, minlength: 3},
	name: {required: true, type: String}
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
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
	const result = await User.find({})
	await connection.close()
	return result
}

const deleteAll = async () => {
	await connection.connect()
	const result = await User.deleteMany({})
	await connection.close()
	return result
}

export default {newUser, allUsers, deleteAll}

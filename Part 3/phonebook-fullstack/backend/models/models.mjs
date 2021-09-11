import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import logger from '../utils/logger.mjs'
import {MONGODB_URI} from '../utils/config.mjs'

//schema model
const contactModel = mongoose.model('Contact', new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
		unique: true
	},
	number: {
		type: String,
		minLength: 8,
		required: true,
	}
}).set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
}).plugin(uniqueValidator))

const connect = async () => {
	//connect to db
	try {
		await mongoose.connect(`${MONGODB_URI}`)
		logger.info('connected to db')
	} catch (err) {
		logger.error('error connecting to db:', err.message)
	}
}

//function to save contact
const save = async (name, number) => {
	//connect to db
	await connect()

	//create contact object according to schema
	const contact = new contactModel({
		name: name,
		number: number
	})

	//save
	const result = await contact.save()
	await close()
	return result
}

//function to get all
const getAll = async () => {
	await connect()
	const result = await contactModel.find({})
	await close()
	return result
}

//function to get single contact by id
const find = async (id) => {
	await connect()
	const result = await contactModel.findById(id)
	await close()
	return result
}

//function to close db
const close = async () => {
	await mongoose.connection.close()
}

const remove = async (id) => {
	await connect()
	const result = await contactModel.findByIdAndRemove(id)
	await close()
	return result
}

const update = async (id, number) => {
	await connect()

	const result = await contactModel.findByIdAndUpdate(id,
		{number: number},
		{new: true,
			runValidators: true})

	await close()
	return result
}

export default {getAll, save, find, update, remove}

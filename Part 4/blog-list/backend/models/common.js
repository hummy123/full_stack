import logger from '../utils/logger.js'
import mongoose from 'mongoose'
import {MONGODB_URI} from '../utils/config.js'

//function to close db
const close = async () => {
	logger.info('closing db')
	await mongoose.connection.close()
}

//connect to db
const connect = async () => {
	try {
		await mongoose.connect(`${MONGODB_URI}`)
		logger.info('connected to db')
	} catch (err) {
		logger.error('error connecting to db:', err.message)
	}
}

export default {connect, close}

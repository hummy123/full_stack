import logger from '../utils/logger.js'
import mongoose from 'mongoose'
import {MONGODB_URI} from '../utils/config.js'
import users from './users.js'
import blogs from './blogs.js'

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

const linkBloAndoUser = async (userID, blogID) => {
	await connect()

	//find user and add blog to user objeect
	let curUser = await users.findById(userID)
	curUser.blogs = curUser.blogs.concat(blogID)
	await connect()
	await users.updateUser(curUser)

	//find blog and save user to blog object
	const curBlog = await blogs.findOne(blogID)
	curBlog.creator = userID
	await blogs.update(blogID, curBlog)

	//await close()
}

export default {connect, close, linkBlogAndoUser: linkBloAndoUser}

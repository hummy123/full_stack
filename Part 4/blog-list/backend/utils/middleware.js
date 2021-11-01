import logger from './logger.js'
import jwt from 'jsonwebtoken'
import {SECRET} from './config.js'
import users from '../models/users.js'

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer'))
		request.token = authorization.substring(7)
	next()
}

export const userExtractor = async (request, response, next) => {
	if (request.token) {
		try {
			const decodedToken = jwt.verify(request.token, SECRET)
			const user = await users.findById(decodedToken.id)
			request.body.user = user._id
		} catch (err) {
			return response.status(401).json({error: err.message})
		}
	}
	next()
}


export default {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}

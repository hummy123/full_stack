//token to get the request body
import morgan from 'morgan'
import logger from './logger.mjs'

morgan.token('body', function (req) { return JSON.stringify(req.body) })

const morganLogger = () => {
	morgan.token('body', function (req) { return JSON.stringify(req.body) })
	return morgan(':method :url :status :res[content-length] - :response-time ms :body')
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

export default {
	morganLogger,
	unknownEndpoint,
	errorHandler
}

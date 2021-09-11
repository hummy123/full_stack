import {PORT} from './utils/config.mjs'
import logger from './utils/logger.mjs'
import http from 'http'
import app from './app.mjs'

const server = http.createServer(app)
server.listen(PORT, () => {
	logger.info(`Server running on port ${PORT} `)
})

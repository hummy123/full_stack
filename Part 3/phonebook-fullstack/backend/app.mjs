import middleware from './utils/middleware.mjs'
import express from 'express'
import cors from 'cors'
import personsRouter from './controllers/person-routes.mjs'
import infoRouter from './controllers/info-route.mjs'

//express server
const app = express()

//middleware used with express
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.morganLogger())

//app routes
app.use('/api/persons', personsRouter)
app.use('/info', infoRouter)

//middleware in case of failure
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app

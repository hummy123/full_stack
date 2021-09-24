import express from 'express'
import cors from 'cors'
import blogRouter from './controllers/blog-routes.js'
import middleware from './utils/middleware.js'
import userRouter from './controllers/user-routes.js'
import loginRouter from './controllers/login-routes.js'
import common from './models/common.js'

//instantiate express server
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

//connect to mongodb before serving any requests
common.connect()

//routes
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

//middleware after routes
app.use(middleware.errorHandler)

export default app

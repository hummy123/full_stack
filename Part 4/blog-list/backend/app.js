import express from 'express'
import cors from 'cors'
import blogRouter from './controllers/blog-routes.js'
import middleware from './utils/middleware.js'
import userRouter from './controllers/user-routes.js'

//instantiate express server
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

export default app

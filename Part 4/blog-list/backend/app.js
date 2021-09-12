import express from 'express'
import cors from 'cors'
import blogRouter from './controllers/blog-routes.js'

//instantiate express server
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/blogs', blogRouter)

export default app

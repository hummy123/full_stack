import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import models from '../models/blogs.js'
import users from '../models/users'

const initialBlogs = [
	{
		'title': 'my blog title',
		'author': 'by humza',
		'url': 'my random url',
		'likes': 0,
		'id': '613e6865b0f637df582f9435'
	},
	{
		'title': 'second blog',
		'author': 'by ghareeb',
		'url': 'google.com',
		'likes': 0,
		'id': '613e6aac3fb65c7b7a0cc951'
	},
	{
		'title': 'yet another blog',
		'author': 'by stranger',
		'url': 'blog.com',
		'likes': 0,
		'id': '613e6ac03fb65c7b7a0cc953'
	}
]

const api = supertest(app)

beforeEach(async () => {
	//reset database state before each test
	await models.deleteAll()
	const user = await users.allUsers()
	for (const blog of initialBlogs) {
		blog.user = user[0].id.toString()
		await models.save(blog)
	}
})

afterAll(() => {
	mongoose.connection.close()
})

describe('test fetching from API', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are three blogs', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('blog objects contain id', async () => {
		const response = await api.get('/api/blogs')
		for (const blog of response.body)
			expect(blog.id).toBeDefined()
	})
})

describe('test posting to API', () => {

	const newBlog = {
		'title': 'test title',
		'author': 'test author',
		'url': 'test url',
		'likes': 0
	}

	test('posting increments blog number increment by 1', async () => {
		//get number of blogs at start
		const initial = await api.get('/api/blogs')

		//get user for blog
		const user = await users.allUsers()

		//save a new object
		await models.save({...newBlog, user: user[0].id.toString()})
		//get number of blogs again (which should be previous + 1
		const final = await api.get('/api/blogs')
		//compare initial and final
		expect(final.body).toHaveLength(initial.body.length+1)
	})

	test('saved object can be found on db', async () => {
		//get user for blog
		const user = await users.allUsers()
		//save a new object
		const response = await models.save({...newBlog, user: user[0].id.toString()})

		/* response should be equal to object.
		 * checking individual properties because response
		 * has additional "id" parameter that can't be deleted. */
		expect(response.title).toBe(newBlog.title)
		expect(response.author).toBe(newBlog.author)
		expect(response.url).toBe(newBlog.url)
		expect(response.likes).toBe(newBlog.likes)
	})

	test('default likes to 0 if no likes in object', async () => {
		//get user for blog
		const user = await users.allUsers()

		//object with no 'likes' property
		const tempBlog = {
			'title': 'test title',
			'author': 'test author',
			'url': 'test url',
			user: user[0].id.toString()
		}
		const response = await models.save(tempBlog)
		expect(response.likes).toBe(0)
	})

	test('respond with code 400 if title and url missing', async () => {
		//get user for blog
		const user = await users.allUsers()

		const malformedBlog = {
			'author': 'test author',
			'likes': 0,
			user: user[0].id.toString()
		}
		await api
			.post('/api/blogs')
			.send(malformedBlog)
			.expect(400)
	})
})

import supertest from 'supertest'
import app from '../app'
import models from '../models/users'

const api = supertest(app)

const initialUsers = [
	{
		'username': 'astranger',
		'name': 'stranger',
		'password': 'ihsowieof'
	},
	{
		'username': 'gladtidings',
		'name': 'ghareeb',
		'password': 'qwesnsnl'
	},
	{
		'username': 'hiddenuser',
		'name': 'anonymous',
		'password': 'secret'
	}
]

beforeEach(async () => {
	await models.deleteAll()
	for (const user of initialUsers)
		await models.newUser(user)
})

describe('test user creation', () => {
	test('creating new user increments total number', async () => {
		const initial = await api.get('/api/users')

		const user = {
			'username': 'testUser',
			'name': 'noName',
			'password': 'react'
		}
		await api
			.post('/api/users')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const final = await api.get('/api/users')
		expect(final.body).toHaveLength(initial.body.length+1)
	})

	test('invalid when username has less than 3 characters', async () => {
		jest.setTimeout(5000)
		const malformedUser = {
			'username': 'qw',
			'name': 'testName',
			'password': 'react'
		}

		const result = await api
			.post('/api/users')
			.send(malformedUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('ValidationError')
	})

	test('invalid when password less than 3 characters', async () => {
		jest.setTimeout(5000)
		const malformedUser = {
			'username': 'qwerty',
			'name': 'testName',
			'password': 'er'
		}

		const result = await api
			.post('/api/users')
			.send(malformedUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toBe('password must contain at least 3 characters')
	})

	test('invalid when username is duplicate', async () => {
		jest.setTimeout(5000)
		const malformedUser = {
			'username': 'astranger',
			'name': 'wqerrfjerlkv',
			'password': 'sanvlksn'
		}

		const result = await api
			.post('/api/users')
			.send(malformedUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('ValidationError')
	})
})

const assert    = require('chai').assert
const mongo     = require('../utils/mongo')
const supertest = require('../utils/supertest')

describe('Application health', () => {
	before(async function () {
		return mongo.prepareDatabase()
	})

	after(async function () {
		return mongo.closeDatabase()
	})

	it('Check health will return 200', async function () {
		const res = await supertest.get('/v1/healthz')

		assert.equal(res.statusCode, 201)
	})
})

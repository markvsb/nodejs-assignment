const { assert } = require('chai')
const mongo      = require('../utils/mongo')
const supertest  = require('../utils/supertest')

describe('Application health', () => {
	before(async () => mongo.prepareDatabase())

	after(async () => mongo.closeDatabase())

	it('Check health will return 200', async () => {
		const res = await supertest.get('/v1/healthz')

		assert.equal(res.statusCode, 201)
	})
})

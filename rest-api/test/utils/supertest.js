const supertest = require('supertest')
const restify   = require('../../src/components/restify')

if (process.env.NODE_ENV !== 'test') {
	throw new Error(`Running tests in wrong environment: ${process.env.NODE_ENV}`)
}

const st = supertest(restify)

module.exports = st

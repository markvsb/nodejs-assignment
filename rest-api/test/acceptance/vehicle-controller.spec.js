const assert       = require('chai').assert
const supertest    = require('../utils/supertest')
const mongo        = require('../utils/mongo')
const VehicleStats = require('../../src/models/VehicleStats.model')

const simpleVehicle = {
	timestamp: new Date('2019-01-01T00:00:00Z'),
	name:      'test-vehicle',
	speed:     12,
	energy:    53.2,
	gps:       {
		lat:  52.0892448425293,
		long: 5.106178283691406,
	},
	odo: 88526.43,
	soc: 72.8,
}

describe('Vehicle list controller', () => {
	before(async function () {
		return mongo.prepareDatabase()
	})

	after(async function () {
		return mongo.closeDatabase()
	})

	afterEach(async () => {
		await VehicleStats.deleteMany({})
	})

	it('Query vehicles should return a list', async function () {
		await VehicleStats.create({ ...simpleVehicle })

		const res = await supertest.get('/v1/vehicles')

		assert.equal(res.statusCode, 200)
		assert.deepEqual(res.body, {
			data: ['test-vehicle'],
		})
	})

	it('Query vehicles should list with 2 vehicles', async function () {
		await Promise.all([
			VehicleStats.create({ ...simpleVehicle, name: 'simple-vehicle' }),
			VehicleStats.create({ ...simpleVehicle }),
		])

		const res = await supertest.get('/v1/vehicles')

		assert.equal(res.statusCode, 200)
		assert.deepEqual(res.body, {
			data: [
				'simple-vehicle',
				'test-vehicle',
			],
		})
	})

	it('Query vehicles should return empty list if no vehicles', async function () {
		const res = await supertest.get('/v1/vehicles')

		assert.equal(res.statusCode, 200)
		assert.deepEqual(res.body, {
			data: [],
		})
	})
})

describe('Vehicle stats controller', () => {
	before(async function () {
		return mongo.prepareDatabase()
	})

	after(async function () {
		return mongo.closeDatabase()
	})

	afterEach(async () => {
		await VehicleStats.deleteMany({})
	})

	it('Query stats should return an object with data', async function () {
		await VehicleStats.create({ ...simpleVehicle, name: 'test-vehicle' })

		const res = await supertest.get('/v1/vehicle/test-vehicle/history')

		assert.equal(res.statusCode, 200)
		assert.deepEqual(res.body, {
			data: [{
				energy: 53.2,
				gps:    {
					lat:  52.0892448425293,
					long: 5.106178283691406,
				},
				name:      'test-vehicle',
				odo:       88526.43,
				soc:       72.8,
				speed:     12,
				timestamp: '2019-01-01T00:00:00.000Z',
			}],
		})
	})

	it('Query vehicles should 404 if no stats available', async function () {
		const res = await supertest.get('/v1/vehicle/unknown-vehicle')

		assert.equal(res.statusCode, 404)
	})
})

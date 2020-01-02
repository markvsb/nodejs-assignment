const { assert }     = require('chai')
const speedIncident  = require('../../src/incidents/speed')
const chargeIncident = require('../../src/incidents/charge')

describe('Speed', () => {
	it('Should trigger if speed higher than 50', async () => {
		const triggered = speedIncident.check(52)

		assert.equal(triggered, true)
	})

	it('Should not trigger if speed lower than 50', async () => {
		const triggered = speedIncident.check(45)

		assert.equal(triggered, false)
	})

	it('Should not trigger if speed equals 50', async () => {
		const triggered = speedIncident.check(50)

		assert.equal(triggered, false)
	})
})

describe('Charge', () => {
	it('Should trigger if charge lower than 20', async () => {
		const triggered = chargeIncident.check(22)

		assert.equal(triggered, false)
	})

	it('Should not trigger if speed lower than 20', async () => {
		const triggered = chargeIncident.check(18)

		assert.equal(triggered, true)
	})

	it('Should trigger if speed equals 20', async () => {
		const triggered = chargeIncident.check(20)

		assert.equal(triggered, true)
	})
})

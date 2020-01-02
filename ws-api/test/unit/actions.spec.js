const { assert } = require('chai')
const actions    = require('../../src/actions')

describe('Actions', () => {
	it('Should subscribe on message method', async () => {
		const subscribed = actions.exec({
			id: 1,
		}, {
			method: 'subscribe',
			data:   {
				name: 'unknown',
			},
		})

		assert.isTrue(subscribed)
	})

	it('Should not subscribe double', async () => {
		actions.exec({
			id: 1,
		}, {
			method: 'subscribe',
			data:   {
				name: 'unknown',
			},
		})

		const subscribed = actions.exec({
			id: 1,
		}, {
			method: 'subscribe',
			data:   {
				name: 'unknown',
			},
		})

		assert.isFalse(subscribed)
	})

	it('Should not fail on unknown method', async () => {
		actions.exec({}, {
			method: 'unknown',
			data:   {},
		})

		assert.isOk('not fails')
	})
})

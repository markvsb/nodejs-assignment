const { assert } = require('chai')
const rewire     = require('rewire')

const subscriptionService = rewire('../../src/services/subscription')

describe('Subscribe actions', () => {
	it('Should subscribe', async () => {
		const subscribed = subscriptionService.subscribe({
			id: 1,
		}, 'my-channel')

		assert.isTrue(subscribed)
	})

	it('Should support multi-subscription', async () => {
		subscriptionService.subscribe({
			id: 1,
		}, 'my-channel')

		const subscribed = subscriptionService.subscribe({
			id: 2,
		}, 'my-channel')

		assert.isTrue(subscribed)
	})

	it('fail to subscribe double', async () => {
		subscriptionService.subscribe({
			id: 1,
		}, 'my-channel')

		const subscribed = subscriptionService.subscribe({
			id: 1,
		}, 'my-channel')

		assert.isFalse(subscribed)
	})
})

describe('Unsubscribe actions', () => {
	afterEach(() => {
		subscriptionService.__set__('subscriptions', {})
	})

	it('Should unsubscribe', async () => {
		subscriptionService.__set__('subscriptions', {
			'my-channel': [{ id: 1 }],
		})

		const unsubscribe = subscriptionService.unsubscribe({
			id: 1,
		}, 'my-channel')

		assert.isTrue(unsubscribe)
	})

	it('Fail to unsubscribe if not subscribed', async () => {
		const subscribed = subscriptionService.unsubscribe({
			id: 1,
		}, 'my-channel')

		assert.isFalse(subscribed)
	})

	it('Unsubscribe will remove only current subscription', async () => {
		subscriptionService.__set__('subscriptions', {
			'my-channel':  [{ id: 1 }],
			'my-channel2': [{ id: 1 }],
		})

		subscriptionService.unsubscribe({
			id: 1,
		}, 'my-channel')

		assert.deepEqual(subscriptionService.__get__('subscriptions'), {
			'my-channel':  [],
			'my-channel2': [{ id: 1 }],
		})
	})
})

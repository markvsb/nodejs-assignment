const assert              = require('chai').assert
const rewire              = require('rewire')
const subscriptionService = rewire('../../src/services/subscription')

describe('Subscribe actions', () => {
	it('Should subscribe', async function () {
		const subscribed = subscriptionService.subscribe({
			id: 1,
		}, 'my-channel')

		assert.isTrue(subscribed)
	})

	it('Should support multi-subscription', async function () {
		subscriptionService.subscribe({
			id: 1,
		}, 'my-channel')

		const subscribed = subscriptionService.subscribe({
			id: 2,
		}, 'my-channel')

		assert.isTrue(subscribed)
	})

	it('fail to subscribe double', async function () {
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

	it('Should unsubscribe', async function () {
		subscriptionService.__set__('subscriptions', {
			'my-channel': [{ id: 1 }],
		})

		const unsubscribe = subscriptionService.unsubscribe({
			id: 1,
		}, 'my-channel')

		assert.isTrue(unsubscribe)
	})

	it('Fail to unsubscribe if not subscribed', async function () {
		const subscribed = subscriptionService.unsubscribe({
			id: 1,
		}, 'my-channel')

		assert.isFalse(subscribed)
	})

	it('Unsubscribe will remove only current subscription', async function () {
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

const webSocket = require('ws')
const logger    = require('../components/logger')

const subscriptions = {}

const subscribe = (ws, channel) => {
	if (!subscriptions[channel]) {
		subscriptions[channel] = []
	}
	if (subscriptions[channel].find((item) => item.id === ws.id) === undefined) {
		subscriptions[channel].push(ws)
		return true
	}

	return false
}

const unsubscribeFromChannel = (ws, channel = null) => {
	if (!subscriptions[channel]) {
		return false
	}

	const subscribersCount = subscriptions[channel].length
	subscriptions[channel] = subscriptions[channel].filter((item) => ws.id !== item.id)

	return subscribersCount > subscriptions[channel].length
}

const unsubscribe = (ws, channel = null) => {
	if (channel) {
		return unsubscribeFromChannel(ws, channel)
	}

	Object.keys(subscriptions).forEach((e) => {
		unsubscribeFromChannel(ws, e)
	})

	return true
}

const dispatchMessage = (model) => {
	if (subscriptions[model.name] && subscriptions[model.name].length) {
		subscriptions[model.name].forEach((client) => {
			if (client.readyState === webSocket.OPEN) {
				client.send(JSON.stringify(model), (err) => {
					if (err) {
						logger.warn('Unable to deliver message', err)
					}
				})
			}
		})
	} else {
		logger.info('No connected clients to send')
	}
}

module.exports = {
	subscribe,
	unsubscribe,
	dispatchMessage,
}

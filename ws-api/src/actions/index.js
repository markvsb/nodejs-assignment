const { subscribe } = require('../services/subscription')
const logger        = require('../components/logger')

module.exports = {
	exec: (ws, message) => {
		switch (message.method) {
			case 'subscribe':
				return subscribe(ws, message.data.name)
			default:
				logger.warn('Unknown message')
				return null
		}
	},
}

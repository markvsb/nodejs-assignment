module.exports = {
	logger: {
		logLevel: process.env.LOG_LEVEL || 'debug',
	},
	nats: {
		url: process.env.NATS_URL || 'nats://localhost:4222',
	},
	websocket: {
		port: process.env.WEBSOCKET_PORT || '8000',
	},
}

module.exports = {
	logger: {
		logLevel: process.env.LOG_LEVEL || 'debug',
	},
	nats: {
		url: process.env.NATS_URL || 'nats://localhost:4222',
	},
	websocket: {
		host: process.env.WEBSOCKET_HOST || 'localhost',
		port: process.env.WEBSOCKET_PORT || '8000',
	},
}

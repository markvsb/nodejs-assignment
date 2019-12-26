module.exports = {
	logger: {
		logLevel: process.env.LOG_LEVEL || 'debug',
	},
	nats: {
		url: process.env.NATS_URL || 'nats://localhost:4222',
	},
	mongo: {
		dsn: process.env.MONGO_DSN || 'mongodb://localhost:27017/incidents',
	},
}

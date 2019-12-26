module.exports = {
	app: {
		port: process.env.APP_PORT || 3000,
	},
	logger: {
		logLevel: process.env.LOG_LEVEL || 'debug',
	},
	mongo: {
		dsn: process.env.MONGO_DSN || 'mongodb://localhost:27017/statistics',
	},
}

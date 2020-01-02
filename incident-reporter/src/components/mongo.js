const mongoose = require('mongoose')
const config   = require('../config')
const logger   = require('./logger')

let mongoInstance = null

mongoose.Promise = global.Promise

mongoose.connection.on('disconnected', () => {
	mongoInstance = null
})

if (!mongoInstance) {
	mongoInstance = mongoose.connect(config.mongo.dsn, {
		useNewUrlParser:    true,
		useFindAndModify:   false,
		useCreateIndex:     true,
		useUnifiedTopology: true,
	}).then(() => {
		logger.debug('Connected to MongoDB')
	}, (err) => {
		logger.error(err)
	})
}

module.exports = mongoInstance

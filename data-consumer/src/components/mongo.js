const mongoose = require('mongoose')
const config   = require('../config')
const logger   = require('./logger')

let mongoInstance = null;

mongoose.Promise = global.Promise

if (!mongoInstance) {
	mongoInstance = mongoose.connect(config.mongo.dsn, { useNewUrlParser: true })
	.then(() => {
		logger.debug('Connected to MongoDB')
	}, (err) => {
		logger.error(err)
	})
}

module.exports = mongoInstance

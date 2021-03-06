const winston = require('winston')
const config  = require('../config')

const logger = winston.createLogger({
	level:       config.logger.logLevel,
	format:      winston.format.json(),
	defaultMeta: { service: 'rest-api' },
	transports:  [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	],
})

module.exports = logger

const nats                       = require('nats')
const mongo                      = require('./components/mongo')
const logger                     = require('./components/logger')
const config                     = require('./config')
const { createFromSimpleObject } = require('./service/vehicle')

const NATS_SUBJECT = 'vehicle.*'

const natsConnection = nats.connect({ url: config.nats.url, json: true })

mongo.then(() => {
	natsConnection.subscribe(NATS_SUBJECT, (msg, _, subject) => {
		createFromSimpleObject(subject.split('.').pop(), msg).then((doc) => {
			logger.debug('Object successfully saved to db', doc)
		}).catch((err) => {
			logger.warn('Unable to save object', err)
		})
	})
}).catch((err) => {
	logger.error('Unable to connect to MongoDB', err)
})

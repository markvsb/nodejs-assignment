const nats         = require('nats')
const mongo        = require('./components/mongo')
const logger       = require('./components/logger')
const VehicleStats = require('./models/VehicleStats')
const config       = require('./config')

const NATS_SUBJECT = 'vehicle.*'

const natsConnection = nats.connect({ url: config.nats.url, json: true })

const createFromSimpleObject = function (name, stats) {
	const geoPoint = stats.gps.split('|')
	return VehicleStats.create({
		name,
		timestamp: new Date(stats.time),
		energy:    stats.energy,
		gps:       {
			lat:  geoPoint[0],
			long: geoPoint[1],
		},
		odo:   stats.odo,
		speed: stats.speed,
		soc:   stats.soc,
	})
}

mongo.then(client => {
	natsConnection.subscribe(NATS_SUBJECT, (msg, _, subject) => {
		createFromSimpleObject(subject.split('.').pop(), msg).then((doc) => {
			logger.debug('Object successfully saved to db', doc)
		}).catch((err) => {
			logger.warn('Unable to save object', err)
		})
	})
}).catch(err => {
	logger.fatal('Unable to connect to MongoDB', err)
})

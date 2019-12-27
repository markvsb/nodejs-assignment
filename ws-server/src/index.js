const nats      = require('nats')
const webSocket = require('ws')
const logger    = require('./components/logger')
const config    = require('./config')

const NATS_SUBJECT = 'vehicle.*'

const prepareModel = (subject, msg) => ({
	name:      subject,
	timestamp: new Date(msg.time),
	speed:     msg.speed,
	energy:    msg.energy,
	gps:       msg.gps.split('|'),
	odo:       msg.odo,
	soc:       msg.soc,
})

const send = (msg, _, subject) => {
	if (wss.clients.size > 0) {
		wss.clients.forEach(function each (client) {
			if (client.readyState === webSocket.OPEN) {
				client.send(JSON.stringify(prepareModel(subject.split('.').pop(), msg)), (err) => {
					if (err) {
						logger.warn('Unable to deliver message', err)
					}
				})
			}
		})
	} else {
		logger.info('No connected clients')
	}
}

const natsConnection = nats.connect({ url: config.nats.url, json: true })

const wss = new webSocket.Server({
	host: config.websocket.host,
	port: config.websocket.port,
})

natsConnection.subscribe(NATS_SUBJECT, send)

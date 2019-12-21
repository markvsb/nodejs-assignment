const nats = require('nats')
const WebSocket = require('ws')
const config = require('config')

const prepareModel = (subject, msg) => ({ 
	vehicle: subject,
	stats: msg,
})

const resend = (msg, _, subject) => ws.send(prepareModel(subject, msg));

const ws = new WebSocket.Server(config.websocket.url)

const natsConnection = () => {
	try {
		return nats.connect({ json: true })
	} catch (e) {

	}
}

ws.on('open', () => natsConnection.subscribe('vehicle.*', resend))
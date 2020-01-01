const webSocket = require('ws')
const uuid      = require('uuid')
const logger    = require('../components/logger')

let pongInterval = null

/**
 * @param {String} msg
 */
const parseMessage = (msg) => {
	try {
		const message = JSON.parse(msg)
		if (message.method && message.data) {
			return message
		}
	} catch (err) {
		logger.info('Bad message')
	}
	return null
}

/**
 * Simple pong method
 */
const onPong = function () {
	logger.debug('pong')
	this.isAlive = true
}

/**
 * @param {WebSocket} ws
 * @param {String} msg
 * @param {Function} callback
 */
const onMessage = (ws, msg, callback) => {
	const message = parseMessage(msg)
	if (!message) {
		return null
	}

	callback(ws, message)
}

/**
 * @param {Object} cfg
 * @param {Function} onNewMessage
 * @param {Function} onDisconnect
 */
const initWebSocketServer = (cfg, onNewMessage, onDisconnect) => {
	const wss = new webSocket.Server({ port: cfg.port })

	wss.on('connection', (ws) => {
		ws.id      = uuid.v4()
		ws.isAlive = true
		ws.on('pong', onPong)
		ws.on('message', (msg) => onMessage(ws, msg, onNewMessage))
		ws.on('close', () => onDisconnect(ws))
	})

	wss.on('error', () => {
		clearInterval(pongInterval)
	})

	pongInterval = setInterval(() => {
		wss.clients.forEach((ws) => {
			if (ws.isAlive === false) {
				ws.terminate()
			} else {
				ws.isAlive = false
				ws.ping(() => {})
			}
		})
	}, 10000)

	return wss
}

module.exports = {
	initWebSocketServer,
}

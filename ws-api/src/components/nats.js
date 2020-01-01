const nats = require('nats')

/**
 * @param {object} cfg
 * @param {string} subject
 * @param {subject} onMessage
 */
const initNatsListener = (cfg, subject, onMessage) => {
	const natsConnection = nats.connect({ url: cfg.url, json: true })
	natsConnection.subscribe(subject,  onMessage)
}

module.exports = {
	initNatsListener,
}

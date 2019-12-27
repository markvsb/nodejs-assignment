const nats          = require('nats')
const config        = require('./config')
const mongo         = require('./components/mongo')
const logger        = require('./components/logger')
const Report        = require('./models/Report')
const incidentRules = require('./incidents')

const NATS_SUBJECT = 'vehicle.*'

const incidents = {
	speed:  incidentRules.speed,
	energy: incidentRules.power,
}

const checkIncidents = stats => Object.entries(incidents).filter(inc => inc[1].check(stats[inc[0]])) // fix

const createReport = (stats, triggeredIncidents) => {
	const [lat, long] = msg.gps.split('|')
	const report      = new Report()
	report.name       = subject.split('.').pop()
	report.stats      = {
		...msg,
		gps: { lat, long },
		timestamp: new Date(msg.time),
	}
	report.incidents  = triggeredIncidents.map(alert => alert.name)
	report.save().then((doc) => {
		logger.debug('Report saved successfully', doc)
	}).catch(err => {
		logger.error('Unable to save report', err)
	})
}

const natsConnection = nats.connect({ url: config.nats.url, json: true })

mongo.then(client => {
	natsConnection.subscribe(NATS_SUBJECT, (msg, _, subject) => {
		const triggeredIncidents = checkIncidents(msg)
		if (triggeredIncidents.length > 0) {
			createReport(msg, triggeredIncidents)
		}
	})
}).catch(err => {
	logger.error('Unable to connect to MongoDB', err)
})

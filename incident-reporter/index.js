const nats = require('nats')
const mongoClient = require('mongodb').MongoClient
const config = require('./config')
const incidentRules = require('./incidents')

const checkIncidents = {
	speed: incidentRules.speed,
	energy: incidentRules.power,
};

const natsConnection = nats.connect({ json: true })

const triggeredIncidents = stats => Object.entries(checkIncidents).filter(inc => inc[1].check(stats[inc[0]])) // fix

const prepareModel = (subject, msg, incidents) => ({ 
	vehicle: subject,
	stats: msg,
	incidents,
})

const saveModel = (collection, message) => {
	try {
		 collection.insert(message)
	} catch (e) {
		
	}
}

mongoClient.connect(config.mongo.url, function(err, client) {
	if (err) {
		console.log(err)
	}

	const collection = client.db(config.mongo.db).collection('vehicle')
	natsConnection.subscribe('vehicle.*', (msg, _, subject) => {
		const model = prepareModel(subject, msg);
		const triggeredIncidents = triggeredIncidents(model.stats);
		if (alerts.length > 0) {
			model.incidents = triggeredIncidents.map(alert => alert.name)
			saveModel(collection, model)
		}
	})
})
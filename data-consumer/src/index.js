const nats = require('nats')
const mongoClient = require('mongodb').MongoClient
const config = require('../config')

const natsConnection = nats.connect({ url: config.nats.url , json: true })

const prepareModel = (subject, msg) => ({ 
	vehicle: subject,
	stats: msg,
})

const saveModel = (collection, message) => {
	try {
		console.log(message)
		collection.insert(message)
	} catch (e) {
		
	}
}

mongoClient.connect(config.mongo.url, function(err, client) {
	if (err) {
		console.log(err)
	}

	const collection = client.db(config.mongo.db).collection('vehicle')
	natsConnection.subscribe('vehicle.*', (msg, _, subject) => saveModel(collection, prepareModel(subject, msg)))
})
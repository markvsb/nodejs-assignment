const config  = require('./config')
const restify = require('./components/restify')
const mongo   = require('./components/mongo')
const logger  = require('./components/logger')

mongo.then(client => {
	restify.listen(config.app.port, function () {
		logger.info(`${restify.name} listening at ${restify.url}`)
	})
}).catch(err => {
	logger.error('Unable to connect to MongoDB', err)
})

const restify        = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const mongo          = require('./components/mongo')
const logger         = require('./components/logger')
const controllers    = require('./controllers')

const app = restify.createServer({
	version: '1.0.0',
})

const cors = corsMiddleware({
	origins:       ['*'],
	allowHeaders:  ['Authorization'],
	exposeHeaders: ['Authorization'],
})

app.pre(cors.preflight)
app.use(cors.actual)
app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser())

app.get('/v1/vehicle/:name/status', controllers.vehicle.getStats)
app.get('/v1/vehicle/:name/history', controllers.vehicle.getHistory)
app.get('/v1/vehicles', controllers.vehicle.getList)
app.get('/v1/healthz', controllers.success)

mongo.then(client => {
	app.listen(config.app.port, function () {
		logger.info(`${app.name} listening at ${app.url}`)
	})
}).catch(err => {
	logger.fatal('Unable to connect to MongoDB', err)
})

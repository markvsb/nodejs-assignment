const restify        = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const mongo          = require('./components/mongo')
const logger         = require('./components/logger')
const initRoutes     = require('./routes')
const config         = require('./config')

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

initRoutes(app)

mongo.then(client => {
	app.listen(config.app.port, function () {
		logger.info(`${app.name} listening at ${app.url}`)
	})
}).catch(err => {
	logger.error('Unable to connect to MongoDB', err)
})

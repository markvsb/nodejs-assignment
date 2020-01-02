const restify        = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const initRoutes     = require('./routes')

const app = restify.createServer({
	version: '1.0.0',
})

const cors = corsMiddleware({
	origins: ['*'],
})

app.pre(cors.preflight)
app.use(cors.actual)
app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser())

initRoutes(app)

module.exports = app

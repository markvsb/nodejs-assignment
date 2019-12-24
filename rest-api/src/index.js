const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const db = require('./components/db')

const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0'
})

const cors = corsMiddleware({  
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/healthz', function (req, res, next) {
	res.send(201, {});
	return next()
})

server.get('/vehicle/stats', async (req, res, next) => {
	try {
		const items = await db.collection('vehicle').find({}).sort({'time': -1}).limit(100).toArray()
		res.send({
			data: items
		})
		return next()
	} catch (e) {
		console.log(e);
		res.send(500, 'Server error')
		return next()
	}
})

server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url);
})
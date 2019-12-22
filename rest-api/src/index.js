const restify = require('restify')
const mongoClient = require('mongodb').MongoClient
const config = require('../config')

let db = null;

const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/healthz', function (req, res, next) {
	res.send(201, {});
	return next()
})

server.get('/echo/:name', async (req, res, next) => {
	//try {
		const items = await db.collection('vehicle').find({}).sort({}).limit(50).toArray()
		console.log(items)
		res.send({
			data: items
		})
		return next()
	//} catch (e) {
	//	console.log(e);
	//	res.send(500, 'Server error')
	//	return next()
	//}
})

mongoClient.connect(config.mongo.url, function(err, client) {
	if (err) {
		console.log(err)
	}

	db = client.db(config.mongo.db);
	server.listen(3000, function () {
		console.log('%s listening at %s', server.name, server.url);
	})
})
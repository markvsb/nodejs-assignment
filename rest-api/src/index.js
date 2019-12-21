const restify = require('restify')
const mongoClient = require('mongodb').MongoClient

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

server.get('/echo/:name', function (req, res, next) {
	db.find()
	res.send(req.params)
	return next()
})

mongoClient.connect('mongodb://localhost:27017', function(err, client) {
	if (err) {
		console.log(err)
	}

	db = client;

	server.listen(8080, function () {
		console.log('%s listening at %s', server.name, server.url);
	})
})
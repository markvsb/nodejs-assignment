const mongoose = require('mongoose')
const config   = require('../../src/config')

let mongoInstance = null

mongoose.Promise = global.Promise

mongoose.connection.on('disconnected', () => {
	mongoInstance = null
})

module.exports.prepareDatabase = async () => {
	if (!mongoInstance) {
		mongoInstance = await mongoose.connect(config.mongo.dsn, {
			useNewUrlParser:    true,
			useFindAndModify:   false,
			useCreateIndex:     true,
			useUnifiedTopology: true,
		})
	}

	return mongoInstance
}

module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase()
	await mongoose.disconnect()
}

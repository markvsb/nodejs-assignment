const controllers = require('../controllers')

module.exports = (app) => {
	app.get('/v1/vehicle/:name/status', controllers.vehicle.getStats)
	app.get('/v1/vehicle/:name/history', controllers.vehicle.getHistory)
	app.get('/v1/vehicles', controllers.vehicle.getList)
	app.get('/v1/healthz', controllers.success)
}

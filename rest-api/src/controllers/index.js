const vehicle = require('./vehicle.controller')

const success = (req, res, next) => {
	res.send(201, {})
	return next()
}

module.exports = {
	vehicle,
	success,
}

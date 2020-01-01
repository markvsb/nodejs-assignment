const VehicleStats = require('../models/VehicleStats')

const createFromSimpleObject = function (name, stats) {
	const geoPoint = stats.gps.split('|')
	return VehicleStats.create({
		name,
		timestamp: new Date(stats.time),
		energy:    stats.energy,
		gps:       {
			lat:  geoPoint[0],
			long: geoPoint[1],
		},
		odo:   stats.odo,
		speed: stats.speed,
		soc:   stats.soc,
	})
}

module.exports = {
	createFromSimpleObject,
}

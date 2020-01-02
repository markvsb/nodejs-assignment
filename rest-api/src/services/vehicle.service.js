const VehicleStats = require('../models/VehicleStats.model')

const getVehicles = () => VehicleStats.distinct('name')

const getHistoryStats = (vehicle, projection = null, opts) => VehicleStats.find({
	name: vehicle,
}, projection, opts).sort({
	timestamp: -1,
}).limit(2000).exec()

const getLastStats = async (vehicle) => VehicleStats.find({
	name: vehicle,
}).sort({
	timestamp: -1,
}).limit(1)

module.exports = {
	getVehicles,
	getHistoryStats,
	getLastStats,
}

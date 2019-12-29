const vehicleService = require('../services/vehicle.service')
const logger         = require('../components/logger')

const getList = async (req, res, next) => {
	try {
		res.send({
			data: await vehicleService.getVehicles(),
		})
		return next()
	} catch (e) {
		logger.error(e)
		res.send(500, 'Server error')
		return next()
	}
}

const getStats = async (req, res, next) => {
	try {
		res.send({
			data: await vehicleService.getLastStats(req.params.name).toObject(),
		})
		return next()
	} catch (e) {
		logger.error(e)
		res.send(500, 'Server error')
		return next()
	}
}

const getHistory = async (req, res, next) => {
	try {
		const items = await vehicleService.getHistoryStats(req.params.name, {
			_id:       0,
			name:      1,
			energy:    1,
			gps:       1,
			odo:       1,
			soc:       1,
			speed:     1,
			timestamp: 1,
		}, { lean: true }, {
			limit: 1000,
		})

		if (!items.length) {
			res.send(404)
		}

		res.send({
			data: items.map(item => ({
				...item,
				timestamp: item.timestamp,
			})),
		})
		return next()
	} catch (e) {
		logger.error(e)
		res.send(500, 'Server error')
		return next()
	}
}

module.exports = {
	getList,
	getStats,
	getHistory,
}

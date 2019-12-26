const vehicleService = require('../services/vehicle.service')
const logger = require('../components/logger')

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
		const items = await vehicleService.getHistoryStats(req.params.name, null, { lean: true })
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

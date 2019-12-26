const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	timestamp: Date,
	name:      String,
	speed:     Number,
	energy:    Number,
	gps:       {
		lat:  Number,
		long: Number,
	},
	odo: Number,
	soc: Number,
})

const model = mongoose.model('vehicleStats', schema, 'vehicleStats')

module.exports = model

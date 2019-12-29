const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	timestamp: Date,
	name:      {
		type: String,
		index: true,
	},
	speed:     Number,
	energy:    Number,
	gps:       {
		lat:  Number,
		long: Number,
	},
	odo: Number,
	soc: Number,
})



module.exports = mongoose.model('vehicleStats', schema, 'vehicleStats')

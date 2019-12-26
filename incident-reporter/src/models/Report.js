const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:  String,
	stats: {
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
	},
	incidents: [],
})

const model = mongoose.model('reports', schema, 'reports')

module.exports = model

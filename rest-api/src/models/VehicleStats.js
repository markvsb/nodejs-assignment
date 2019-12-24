const { Schema, Types } = require('mongoose')

const schema = new Schema({});

const VehicleStats = mongoose.model('VehicleStats', schema, 'statistics');
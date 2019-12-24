const config = require('../../config')
const mongoose = require('mongoose');

const db = mongoose.connect(config.mongo.dsn, { useNewUrlParser: true });

module.exports = db;
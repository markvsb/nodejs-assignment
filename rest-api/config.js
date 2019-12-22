module.exports = {
    nats: {
        url: process.env.NATS_VEHICLE_URL || 'nats://nats:4222',
    },
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://mongo:27017',
        db: process.env.MONGO_DB || 'statistics',
    },
}
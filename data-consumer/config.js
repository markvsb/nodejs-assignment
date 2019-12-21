module.exports = {
    nats: {
        url: process.env.NATS_VEHICLE_URL || 'nats://localhost:4222',
    },
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017',
        db: process.env.MONGO_DB || 'statistics',
    },
}
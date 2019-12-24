module.exports = {
    mongo: {
        dsn: process.env.MONGO_DSN || 'mongodb://mongo:27017/statistics',
    },
}
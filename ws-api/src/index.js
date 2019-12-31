const wsServer = require('./components/ws-server')
const nats     = require('./components/nats')
const config   = require('./config')
const execAction = require('./actions').exec
const subscriptionService = require('./services/subscription');
const createFromNats  = require('./models/VehicleStats').createFromNats

const NATS_SUBJECT = 'vehicle.*'

wsServer.initWebSocketServer(
    config.websocket,
    execAction,
    subscriptionService.unsubscribe
)

nats.initNatsListener(
    config.nats,
    NATS_SUBJECT,
    (msg, _, subject) => {
        subscriptionService.dispatchMessage(createFromNats(msg, _, subject))
    }
)

import config from '../config'
import EventEmitter from 'events'

const RECONNECT_AFTER_MS = 1000

export const createEmitter = () => {
	return new EventEmitter()
}

export const wsConnect = (wsEmitter) => {
	const websocket     = new WebSocket(config.websocket.url)
	websocket.onerror   = function (err) {
		wsEmitter.emit('error', websocket, err)
		websocket.close()
	}
	websocket.onmessage = (broadcast) => {
		wsEmitter.emit('message', websocket, broadcast)
	}
	websocket.onopen    = () => {
		wsEmitter.emit('open', websocket)
	}
	websocket.onclose   = () => {
		setTimeout(() => {
			wsConnect(wsEmitter)
		}, RECONNECT_AFTER_MS)
		wsEmitter.emit('close', websocket)
	}
}

import EventEmitter from 'events'
import config from '../config'

const RECONNECT_AFTER_MS = 3000

export const createEmitter = () => new EventEmitter()

export const wsConnect = (wsEmitter) => {
	const websocket     = new WebSocket(config.websocket.url)
	websocket.onerror   = (err) => {
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

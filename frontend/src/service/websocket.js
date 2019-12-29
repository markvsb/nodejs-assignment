import config from '../config'

export const init = () => {
	return new WebSocket(config.websocket.url)
}

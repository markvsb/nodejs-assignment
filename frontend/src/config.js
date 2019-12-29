export default {
	api: {
		url: process.env.VUE_APP_API_URL || 'http://localhost:3000',
	},
	websocket: {
		url: process.env.VUE_APP_WEBSOCKET_URL || 'ws://localhost:8000',
	},
}

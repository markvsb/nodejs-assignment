export default {
	api: {
		url: 'http://localhost:3000' || process.env.API_URL,
	},
	websocket: {
		url: 'ws://localhost:8000' || process.env.WEBSOCKET_URL,
	},
}

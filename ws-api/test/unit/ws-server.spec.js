const { assert } = require('chai')
const rewire     = require('rewire')
const WebSocket  = require('ws')

const wsServer = rewire('../../src/components/ws-server')

describe('WebSocket server', () => {
	before(function () {
		this.wsServer = null
	})

	afterEach(function () {
		if (this.wsServer) {
			this.wsServer.clients.forEach((socket) => {
				socket.close()
				process.nextTick(() => {
					if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
						// Socket still hangs, hard close
						socket.terminate()
					}
				})
			})
		}
		clearInterval(wsServer.__get__('pongInterval'))
		if (this.wsServer) {
			this.wsServer.close()
		}
	})

	it('Should set id and alive state', async function () {
		this.wsServer = wsServer.initWebSocketServer(
			{ port: 65001 },
			() => {},
			() => {},
		)

		const client = new WebSocket('ws://localhost:65001')
		await new Promise((resolve) => { client.on('open', () => resolve()) })
		const ws = this.wsServer.clients.values().next().value

		assert.isNotNull(ws.id)
		assert.isTrue(ws.isAlive)
	})

	it('Should trigger action on correct message', async function () {
		const executed = await new Promise((resolve) => {
			this.wsServer = wsServer.initWebSocketServer(
				{ port: 65001 },
				() => {
					resolve(true)
				},
				() => {},
			)

			const client = new WebSocket('ws://localhost:65001')
			client.on('open', () => {
				client.send(JSON.stringify({
					method: 'a',
					data:   [],
				}))
			})
		})

		assert.isTrue(executed)
	})
})

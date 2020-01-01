<template>
	<div class="main">
		<div style="float:right;margin-top:6px;">
			<NetworkStatus v-bind:status="this.networkStatus"></NetworkStatus>
		</div>
		<Header v-bind:title="(this.$route.params.name || 'Loading...')" icon="eva-car-outline"></Header>
		<div class="current-status">
			<div style="width:40%;">
				<Map v-bind:geopoint="this.current.gps"></Map>
			</div>
			<div style="width:55%;">
				<div><Bar title="Battery percentage" icon="eva-charging-outline" metric="%" v-bind:value="this.current.soc"></Bar></div>
				<div class="margin-default"><Bar title="Speed" icon="eva-activity-outline" metric="km/h" v-bind:value="this.current.speed"></Bar></div>
				<div class="margin-default">
					<div class="col-half"><TitledValue title="Energy" icon="eva-flash-outline" metric="kW" v-bind:value="this.current.energy"></TitledValue></div>
					<div class="col-half"><TitledValue title="Odometer" icon="eva-trending-up-outline" metric="km" v-bind:value="this.current.odo"></TitledValue></div>
				</div>
			</div>
		</div>
		<div class="graph margin-default"><LineChart
			id="chart-energy"
			title="Speed profile"
			icon="eva-activity-outline"
			v-bind:graph="this.pastSpeed"
			label="le speed (km/h)"
			color="#6cc918"
		></LineChart></div>
		<div class="graph margin-default"><LineChart
			id="chart-soc"
			title="State of charge profile"
			icon="eva-battery-outline"
			v-bind:graph="this.pastSOC"
			label="State of charge (%)"
			color="#539c10"
		></LineChart></div>
	</div>
</template>

<script>
import { getHistory } from '../service/api'
import { createEmitter, wsConnect } from '../service/websocket'
import Bar from '../components/BaseBar.vue'
import Header from '../components/BaseHeader.vue'
import NetworkStatus from '../components/NetworkStatus.vue'
import Map from '../components/BaseMap.vue'
import TitledValue from '../components/BaseTitledValue.vue'
import LineChart from '../components/BaseLineChart.vue'

const refetchTimeout = 3000

export default {
	name:       'leStats',
	components: {
		Bar,
		Header,
		Map,
		LineChart,
		NetworkStatus,
		TitledValue,
	},
	data () {
		return {
			name:          this.$route.params.name,
			websocket:     null,
			networkStatus: false,
			pastData:      [],
			current:       {
				gps:       null,
				timestamp: null,
				odo:       null,
				energy:    null,
				speed:     null,
				soc:       null,
			},
		}
	},
	computed: {
		pastSpeed: function () {
			return this.pastData.map((item) => ({
				x: new Date(item.timestamp),
				y: item.speed,
			}))
		},
		pastSOC: function () {
			return this.pastData.map((item) => ({
				x: new Date(item.timestamp),
				y: item.soc,
			}))
		},
	},
	methods: {
		loadHistory: function (name) {
			return getHistory(name).then((data) => {
				this.pastData = data.data
				const last    = data.data[0] || {}
				if (last) {
					this.fillCurrent(last)
				}
			}).catch((err) => {
				if (err.statusCode === 404) {
					this.$router.push({ name: 'vehicles' })
				} else {
					setTimeout(() => {
						this.loadHistory(name)
					}, refetchTimeout)
				}
			})
		},
		initWebsocket: function () {
			const wsEmitter = createEmitter()
			wsEmitter.on('open', (ws) => {
				this.networkStatus = true
				ws.send(JSON.stringify({
					method: 'subscribe',
					data:   {
						name: 'test-bus-1',
					},
				}))
			})
			wsEmitter.on('message', (ws, broadcast) => {
				this.fillCurrent(JSON.parse(broadcast.data))
			})
			wsEmitter.on('error', () => {
				this.networkStatus = false
			})
			this.websocket = wsConnect(wsEmitter)
		},
		fillCurrent: function (last) {
			if (last.name === this.$route.params.name) {
				this.current.timestamp = last.timestamp
				this.current.soc       = last.soc
				this.current.energy    = last.energy
				this.current.speed     = last.speed
				this.current.odo       = last.odo
				this.current.gps       = Array.isArray(last.gps) ? last.gps : Object.values(last.gps)
			}
		},
	},
	mounted: function () {
		this.loadHistory(this.$route.params.name)
		this.initWebsocket()
	},
}
</script>

<style scoped>
.main {
	max-width:600px;
}
.current-status {
	display:inline-block;
	position:relative;
	width:100%;
}
.current-status > div:first-child {
	margin-left:0;
}
.current-status > div {
	display:inline-block;
	vertical-align:top;
	margin-left:5%;
}
.col-half {
	display:inline-block;
	width:50%
}
.graph {
	position: relative;
}
a {
	color: #42b983;
}
canvas {
	height: 200px;
}
</style>

<template>
	<div class="main">
		<div class="current-status">
			<div style="width:40%;">
				<Map v-bind:geopoint="this.current.gps"></Map>
			</div>
			<div style="width:55%;">
				<div><Bar title="Battery percentage" metric="%" v-bind:value="this.current.soc"></Bar></div>
				<div class="margin-default"><Bar title="Speed" metric="km/h" v-bind:value="this.current.speed"></Bar></div>
				<div class="margin-default">
					<div class="col-half"><TitledValue title="Energy" metric="kW" v-bind:value="this.current.energy"></TitledValue></div>
					<div class="col-half"><TitledValue title="Odometer" metric="km" v-bind:value="this.current.odo"></TitledValue></div>
				</div>
			</div>
		</div>
		<div class="graph margin-default"><LineChart
			id="chart-energy"
			title="Speed profile"
			v-bind:graph="this.pastSpeed"
			label="Vehicle speed (km/h)"
			color="orange"
		></LineChart></div>
		<div class="graph margin-default"><LineChart
			id="chart-soc"
			title="State of charge profile"
			v-bind:graph="this.pastSOC"
			label="State of charge (%)"
			color="blue"
		></LineChart></div>
	</div>
</template>

<script>
import rp from 'request-promise-native'
import Bar from '../components/Bar/Bar.vue'
import Map from '../components/Map/Map.vue'
import TitledValue from '../components/TitledValue/TitledValue.vue'
import LineChart from '../components/LineChart/LineChart.vue'

export default {
	name:       'VehicleStats',
	components: {
		Bar,
		Map,
		LineChart,
		TitledValue,
	},
	data () {
		return {
			pastData: [],
			current:  {
				gps:       [0, 0],
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
	mounted: async function () {
		const self = this
		rp({
			url:  'http://localhost:3000/v1/vehicle/test-bus-1/history',
			json: true,
		}).then((data) => {
			self.pastData = data.data
			const last    = data.data[0] || {}
			if (last) {
				self.current.timestamp = last.timestamp
				self.current.soc       = last.soc
				self.current.energy    = last.energy
				self.current.speed     = last.speed
				self.current.odo       = last.odo
				self.current.gps       = Object.values(last.gps)
			}
		})
		const ws  = new WebSocket('ws://localhost:8000')
		ws.onopen = () => {
			this.connected = true
		}
		ws.onmessage = broadcast => {
			const last   = JSON.parse(broadcast.data)
			self.current = last
		}
		ws.onerror = error => {
			console.log(`WebSocket error: ${error}`); //eslint-disable-line
		}
	},
}
</script>

<style scoped>
h3 {
	margin: 40px 0 0;
}
.main {
	width:600px;
	height:500px;
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
.margin-default {
	margin-top:20px;
}
a {
	color: #42b983;
}
canvas {
	height: 200px;
}
</style>

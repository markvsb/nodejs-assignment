<template>
	<div class="main">
		<div class="logo"><img src="../assets/logo.png" /></div>
		<div class="h1-with-icon"><i class="eva eva-list-outline"></i><h1>List of vehicles</h1></div>
		<div class="loading" v-if="this.vehicles === null">Loading...</div>
		<nav v-else>
			<router-link
				v-bind:key="vehicle"
				v-for="vehicle in vehicles"
				:to="{ name: 'vehicleStats', params: { name: vehicle }}"
			>
				{{ vehicle }}
			</router-link>
		</nav>
	</div>
</template>

<script>
import { getVehicles } from '../service/api'

const reconnectTimeout = 3000

export default {
	name:       'VehicleList',
	components: {
	},
	data () {
		return {
			vehicles: null,
		}
	},
	methods: {
		loadVehicles: function (name) {
			return getVehicles().then((data) => {
				this.vehicles = data.data
			}).catch(() => {
				setTimeout(() => {
					this.loadVehicles(name)
				}, reconnectTimeout)
			})
		},
	},
	mounted: function () {
		this.loadVehicles()
	},
}
</script>

<style scoped>
	.loading {
		padding: 4px;
		text-align: center;
	}
	.logo {
		margin: 10px auto;
		width: 250px;
	}
	.logo img {
		width: 250px;
	}
	nav {
		margin: 0 0 10px;
	}
	nav a {
		padding: 4px 0 10px;
		color: #333;
	}
</style>

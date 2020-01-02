import VehicleStats from './containers/VehicleStats.vue'
import VehicleList from './containers/VehicleList.vue'

export default [
	{ name: 'root', path: '/', redirect: { name: 'vehicles' } },
	{ name: 'vehicles', path: '/vehicles',  component: VehicleList },
	{ name: 'vehicleStats', path: '/vehicle/:name',  component: VehicleStats },
]

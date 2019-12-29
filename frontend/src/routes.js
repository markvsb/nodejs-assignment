import VehicleStats from './containers/VehicleStats'
import VehicleList from './containers/VehicleList'

export default [
	{ name: 'root', path: '/', redirect: { name: 'vehicles' } },
	{ name: 'vehicles', path: '/vehicles',  component: VehicleList },
	{ name: 'vehicleStats', path: '/vehicle/:name',  component: VehicleStats },
]

import rp from 'request-promise-native'
import config from '../config'

export const getVehicles = () => {
	return rp({
		url:  `${config.api.url}/v1/vehicles`,
		json: true,
	})
}

export const getHistory = (name) => {
	return rp({
		url:  `${config.api.url}/v1/vehicle/${name}/history`,
		json: true,
	})
}

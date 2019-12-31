module.exports = {
	createFromNats: (msg, _, subject) => ({
		name:      subject.split('.').pop(),
		timestamp: new Date(msg.time),
		speed:     msg.speed,
		energy:    msg.energy,
		gps:       msg.gps.split('|'),
		odo:       msg.odo,
		soc:       msg.soc,
	}),
}

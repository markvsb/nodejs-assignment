<template>
  <div id="app" style="margin:25px auto 0; max-width:600px;">
    <VehicleStats></VehicleStats>
  </div>
</template>

<script>
import VehicleStats from './containers/VehicleStats.vue'

export default {
	name:       'app',
	components: {
		VehicleStats,
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.loading {
	background: linear-gradient(90deg, rgb(150,150,150), rgb(200,200,200), rgb(150,150,150));
	background-size: 400% 400%;
	animation: animatedbg 1.5s ease infinite;
	filter:grayscale(90%)
}

@keyframes animatedbg {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>

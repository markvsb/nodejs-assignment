<template>
  <div id="app" style="margin:25px auto 0; max-width:500px;">
    <VehicleStats msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import VehicleStats from './components/VehicleStats.vue'

export default {
  name: 'app',
  components: {
    VehicleStats
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

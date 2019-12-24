<template>
  <div class="hello" style="width:500px;height:500px;">
    <Map title="Battery percentage" value="55"></Map>
    <Speedometer title="Battery percentage" value="55"></Speedometer>
    <div style="position: relative;"><Bar title="Battery percentage" value="55"></Bar></div>
    <div style="position: relative;"><LineChart></LineChart></div>
    <div style="position: relative;"><LineChart></LineChart></div>
  </div>
</template>

<script>
import rp from 'request-promise-native';
import Bar from './Bar/Bar.vue';
import Map from './Map/Map.vue';
import LineChart from './LineChart/LineChart.vue';
import Speedometer from './Speedometer/Speedometer.vue';

export default {
  name: 'VehicleStats',
  components: {
    Bar,
    Map,
    LineChart,
    Speedometer
  },
  data: () => {
    return [{
      energy: 0,
      gps: 0,
      odo: 0,
      speed: 0,
      soc: 0,
    }]
  },
  mounted: async () => {
    const a = await rp({
      url: 'http://localhost:3000/vehicle/stats',
    });
    // eslint-disable-next-line
    console.log(a);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
canvas {
  height: 200px;
}
</style>

<template>
  <div class="hello" style="width:500px;height:500px;">
    <Map title="Battery percentage" v-bind:geopoint="this.current.gps"></Map>
    <Speedometer title="Speed" v-bind:value="this.current.speed"></Speedometer>
    <div style="position: relative;"><Bar title="Battery percentage" v-bind:value="this.current.soc"></Bar></div>
    <div style="position: relative;"><Bar title="speed" v-bind:value="this.current.speed"></Bar></div>
    <div style="position: relative;"><LineChart
      id="chart-energy"
      v-bind:graph="this.pastSpeed"
      label="Vehicle speed (kn/h)"
      color="orange"
    ></LineChart></div>
    <div style="position: relative;"><LineChart
      id="chart-soc"
      v-bind:graph="this.pastSOC"
      label="State of charge profile"
      color="blue"
    ></LineChart></div>
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
  data () { 
    return {
      pastData: [],
      current: {
        gps: [47.413226, -1.219482],
        timestamp: null,
        odo: null,
        energy: null,
        speed: null,
        soc: null,
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
    }
  },
  mounted: async function () {
    const self = this;
    rp({
      url: 'http://localhost:3000/v1/vehicle/test-bus-1/history',
      json: true,
    }).then((data) => {
      self.pastData = data.data
      const last = data.data[0] || {};
      if (last) {
        self.current.timestamp = last.timestamp
        self.current.soc = last.soc
        self.current.energy = last.energy
        self.current.speed = last.speed
        self.current.odo = last.odo
        self.current.gps = Object.values(last.gps)
      }
    })
    const ws = new WebSocket("ws://localhost:8000");
    ws.onopen = () => {
      this.connected = true;
    };
    ws.onmessage = broadcast => {
      let last = JSON.parse(broadcast.data);
      self.current = last
      //self.pastData.push(last)
      /*self.current.timestamp = last.timestamp
      self.current.soc = last.soc
      self.current.energy = last.energy
      self.current.speed = last.speed
      self.current.odo = last.odo
      self.current.gps = last.gps*/
    };
    ws.onerror = error => {
      console.log(`WebSocket error: ${error}`); //eslint-disable-line
    };
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

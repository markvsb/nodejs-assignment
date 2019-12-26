<template lang="html">
    <div style="height: 300px;">
      <l-map ref="myMap" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker ref="myMarker" :lat-lng="marker.position" :draggable=true></l-marker>
      </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: ['geopoint'],
  mounted() {
    delete Icon.Default.prototype._getIconUrl;

    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
  },
  data() {
    return {
      zoom: 14,
      center: this.geopoint,
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: {
       position: { lat: this.geopoint[0], lng: this.geopoint[1] }
      }
    }
  },
  watch: {
    geopoint: function () {
      this.$refs.myMap.mapObject.setView(this.geopoint);
      this.$refs.myMarker.setLatLng(this.geopoint);
    }
  }
}
</script>

<style scoped>
    @import "~leaflet/dist/leaflet.css";
</style>
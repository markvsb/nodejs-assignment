<template lang="html">
    <div style="height: 300px;">
        <v-map :zoom="12" :center="[33.4501001, -101.9107704]">
            <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
            <v-marker :lat-lng="[33.4501001, -101.9107704]"></v-marker>
        </v-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  components: {
    vMap: LMap,
    vTilelayer: LTileLayer,
    vMarker: LMarker
  }
}
</script>

<style scoped>
    @import "~leaflet/dist/leaflet.css";
</style>
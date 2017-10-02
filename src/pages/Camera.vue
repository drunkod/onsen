<template>
  <v-ons-page >
    <div class="content">
<div class="hide">
  </div>
    </div>
    <div id="map" style="height: 100%;">
    <v-map ref="map" :zoom="zoom" :center="center" :dragging=dragging :fullscreenControl=fullscreenControl>
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
      <v-marker :lat-lng="arker" :draggable=draggable></v-marker>
    </v-map>
    </div>
  </v-ons-page>
</template>

<script>

export default {

  data () {
      return {
        zoom:4,
        center:[47.218938, -1.553772],
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">dfgdgdfg dxvcd</a> contributors',
        marker: L.latLng(47.218938, -1.553772),
        arker: L.latLng(50.218938, -1.553772),
        dragging: false,
        draggable: true,
        fullscreenControl: true,
      }
    },
    mounted() {
      //Block only map dragging
      //this.$refs.map.mapObject.dragging.disable();

      //console.log(this)
    }
};
</script>

<style scoped>

.camera {
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hide {
  position: fixed;
  right: 0;
  height: 100%;
  width: 100px;
  z-index: 800;
}
</style>

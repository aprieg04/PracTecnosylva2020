<template>
    <div id='mapid'></div>
</template>

<script>
import leaflet from 'leaflet';
export default {
    mounted () {
        var mymap = leaflet.map('mapid').setView([42.59, -5.57], 15);
        console.log(mymap);
        leaflet.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
        maxZoom: 18
        }).addTo(mymap);
        leaflet.control.scale().addTo(mymap)
    },
 }
</script>

<style>
  #mapid { height: 100%; width: 100%; border: 1px solid black}
</style>
<template>
    <div id='mapid'></div>
</template>


    
<script>
import leaflet from 'leaflet';
export default {
    mounted () {
        var map = leaflet.map('mapid').setView([42.59, -5.57], 15);
        console.log(map);
        var basemap = leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        zoom:14
        }).addTo(map);
        console.log(basemap);
        leaflet.control.scale().addTo(map);
 

 var popup = leaflet.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng) // Sets the geographical point where the popup will open.
        .setContent("Has hecho click en la coordenada:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) // Sets the HTML content of the popup.
        .openOn(map); // Adds the popup to the map and closes the previous one. 
}

map.on('click', onMapClick);
    },

    
 }
 
</script>

<style>
  #mapid { height: 100%; width: 100%; border: 1px solid black; box-shadow:  20px 20px 50px grey }
</style>
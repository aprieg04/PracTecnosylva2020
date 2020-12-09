<template>
    <div id='mapid'></div>
</template>

<script>
import leaflet from 'leaflet';
export default {
    mounted () {
        var OpenTopoMap = leaflet.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 15,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),

        OpenStreetMap_HOT = leaflet.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 15,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        }),

        OpenStreetMap_France = leaflet.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),

        Stadia_AlidadeSmoothDark = leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }),

        Stadia_Outdoors = leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });

        var mymap = leaflet.map('mapid', {
            center: [42.59, -5.57],
            zoom: 15,
            // layers: [lay_mapbox, lay_bing] // Offending line
            });
        leaflet.control.layers({
            "Topografia": OpenTopoMap,
            "HOT      ": OpenStreetMap_HOT,
            "France": OpenStreetMap_France,
            "StadiaDark": Stadia_AlidadeSmoothDark,
            "StadiaOutdoors": Stadia_Outdoors
        }, null, {
        collapsed: true
        }).addTo(mymap);
        OpenStreetMap_France.addTo(mymap);
    },
    
 }
</script>

<style>
  #mapid { height: 100%; width: 100%; border: 1px solid black}
</style>
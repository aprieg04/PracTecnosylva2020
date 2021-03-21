<template>
    <v-app>
      <v-container class="mapa"> 
          <div id='mapid'></div>
      </v-container>
       <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :loading="loadingvariable"
            >
            <template v-slot:item.aplicar="{ item }" >
            <v-checkbox
                v-model="checkbox"
                color="red darken-3"
                @change="aplicarCapa(value, item.url, item.apikey)"
              ></v-checkbox>
            </template>
            </v-data-table>

  </v-app>
</template>

<script>
import queries from "../logic/queries.js";
import leaflet from 'leaflet';
export default {
  name: 'BasePrincipal',
  data: () => ({
      idUs: null,
      tipo: null,
      overlays: {},
      list: [],
      headers: [
            { text: 'Nombre', align: 'start', value: 'nombre' },
            { text: 'Descripción', value: 'descripcion'},
            { text: 'URL', value: 'url' },
            { text: 'Apikey', value: 'apikey' },
            { text: 'Aplicar ', value: 'aplicar', sortable: false },
            ],
    }),
    mounted(){
      this.tipo = this.$store.state.tipo;
      this.idUs = this.$store.state.idUs;
      console.log(this.tipo);
      this.obtenerCapas();

   

      //Map stuff

        var OpenStreetMap_HOT = leaflet.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
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
            layers: [OpenStreetMap_HOT, Stadia_AlidadeSmoothDark, Stadia_Outdoors, OpenStreetMap_France],
            collapsed: true,
            });

        var baseMaps = {
            "OpenStreetMap HOT": OpenStreetMap_HOT,
            "Stadia Outdoors": Stadia_Outdoors,
            "Stadia Smoothdark": Stadia_AlidadeSmoothDark,
            "OpenStreetMap_France": OpenStreetMap_France,
        };

        leaflet.control.layers(baseMaps).addTo(mymap);

        var popup = leaflet.popup()


        //Fetch weather info on map clicking
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("Fetching weather info")
                .openOn(mymap);

            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=' + "64d94ea6cc6a8050afee1febeb4ad9d9")
                .then(r => r.json()) 
                .then(data => { 
                    // Change this line to show exactly the info you need
                    console.log(data);
                    var celcius = Math.round(parseFloat(data.main.temp)-273.15);
                    var iconcode = data.weather.map(w => w.icon);
                    
                    popup.setContent('<img src="http://openweathermap.org/img/w/'+iconcode+'.png"/>'+
                                    "<br> Country: "+data.sys.country+
                                    "<br> City: "+data.name+" ("+data.coord.lon+", "+data.coord.lat+")"+
                                    "<br> Weather: "+data.weather[0].main+
                                    "<br> Description: "+data.weather[0].description+
                                    "<br> Temperature: "+celcius+" °C"+
                                    "<br> Pressure :"+data.main.pressure+" Pa"+
                                    "<br> Humidity: "+data.main.humidity+" %"+
                                    "<br> Wind speed: "+data.wind.speed+" m/s"+
                                    "<br> Wind direction: "+data.wind.deg+" °")
                })
        }

        mymap.on('click', onMapClick)
    },
    methods: {
      obtenerCapas() {
          this.loadingvariable=true;
          if(this.tipo==1)
          {
              queries.obtenerCapasBase(this.idUs)
                .then((response) => {
                    this.list = response.data;
                    this.getDisplay(this.list);
                    this.loadingvariable=false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loadingvariable=false;
                });
          }
          else
          {
              queries.obtenerCapasAdmin()
                .then((response) => {
                    this.list = response.data;
                    this.getDisplay(this.list);
                    this.loadingvariable=false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loadingvariable=false;
                });
          }
      },
      /*aplicarCapa(bool, url, apikey){
          if(apikey=="")
          {
              var newLayer = leaflet.tileLayer(url,{
              maxZoom: 20,
              });
          }
          else{

          }
      },*/
      getDisplay(list){
          return {
              idCapa: list.idCapa,
              nombre: list.nombre,
              descripcion: list.descripcion,
              url: list.url,
              apikey: list.apikey

          }
      }
  }
}
</script>

<style>
  #mapid { height: 100%; width: 100%; border: 1px solid black}
</style>
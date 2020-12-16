<template>
    <v-app>
      <v-container class="mapa"> 
          <mapa></mapa>
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
                @change="aplicarCapa(boolean, item.url, item.apikey)"
              ></v-checkbox>
            </template>
            </v-data-table>

  </v-app>
</template>

<script>
import queries from "../logic/queries.js";
import Mapa from '../components/Mapa.vue'
export default {
  components: { Mapa },
  name: 'BasePrincipal',
  data: () => ({
      idUs: null,
      tipo: null,
      listaMapas: {
        
      },
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

</style>
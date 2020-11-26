<template>
   <div id="app">
        <v-app id="inspire">
        <v-card-title>Solicitudes de registro</v-card-title>
            <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :loading="loadingvariable"
            >
            <template v-slot:item.actions="{ item }">
                <v-icon class="mx-2" color="green" @click="aceptarSolicitud(item.idUsuario)">mdi-check</v-icon>
                <v-icon color="red" @click="denegarSolicitud(item.idUsuario)">mdi-close</v-icon>
            </template>
            </v-data-table>
        </v-app>
    </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js"></script>

<script>
import queries from "../logic/queries.js"

export default{
    mounted() {
        this.obtenerSolicitudes();
        
    },
    data () {
    return {
        loadingvariable: true,
        list: [],
        headers: [
            { text: 'ID', align: 'start', value: 'idUsuario' },
            { text: 'Nombre de usuario', value: 'nombre'},
            { text: 'Número de teléfono', value: 'phoneNumber' },
            { text: 'Email', value: 'email' },
            { text: 'Aceptar / rechazar', value: 'actions', sortable: false }
        ],
    }
  },
  methods: {
      obtenerSolicitudes() {
          this.loadingvariable=true;
          queries.solicitudesRegistro()
          .then((response) => {
              console.log(response)
              this.list = response.data;
              this.getDisplay(this.list);
              this.loadingvariable=false;
          })
          .catch((e) => {
              console.log(e);
              this.loadingvariable=false;
          });
      },
      getDisplay(list){
          return {
              nombre: list.nombre,
              idUsuario: list.idUsuario,
              email: list.email,
              phoneNumber: list.phoneNumber,

          }
      },
      aceptarSolicitud(idUsuario) {
          console.log("Entro aceptar")
          queries.aceptarSolicitud(idUsuario)
           .then((response) => {
              console.log(response)
              this.$router.go()
              
          })
      },
      denegarSolicitud(idUsuario) {
          console.log("Entro denegar")
          console.log(idUsuario)
          queries.denegarSolicitud(idUsuario)
          .then((response) => {
          this.$router.go()
              
          })
      }
  }
}
</script>
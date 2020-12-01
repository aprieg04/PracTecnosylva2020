<template>
   <div id="app">
        <v-app id="inspire">
        <v-card-title>Gestión de usuarios</v-card-title>

        <v-btn color="#B32B2B">
        <v-icon>mdi-file-outline</v-icon>
          <span style="margin-left: 7px; margin-right: 7px;">Crear usuario</span>
        </v-btn>

            <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :loading="loadingvariable"
            >
            <template v-slot:item.actions="{ item }">
                <v-icon class="mx-2" color="blue" @click="aceptarSolicitud(item.idUsuario)">mdi-pencil</v-icon>
                <v-icon color="red" @click="denegarSolicitud(item.idUsuario)">mdi-delete</v-icon>
            </template>
            </v-data-table>
        </v-app>
    </div>
</template>

<script>
import queries from "../logic/queries.js"

export default{
    mounted() {
        this.obtenerUsuarios();
        
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
            { text: 'Editar / Eliminar', value: 'actions', sortable: false }
        ],
    }
  },
  methods: {
      obtenerUsuarios() {
          this.loadingvariable=true;
          queries.obtenerUsuarios()
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
  }
}
</script>
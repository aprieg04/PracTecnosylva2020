<template>
<v-app>
      <v-bottom-nav absolute shift>
        <v-btn color="#B32B2B" @click="boton=1" dark>
        <v-icon>mdi-file-outline</v-icon>
          <span style="margin-left: 7px; margin-right: 7px;">Solicitudes de registro</span>
        </v-btn>
        <v-btn color="#B32B2B" style="margin-left: 10px;" @click="boton=2" dark>
        <v-icon>mdi-account-cog-outline</v-icon>
          <span style="margin-left: 7px; margin-right: 7px;">Gestionar usuarios</span>
        </v-btn>
      </v-bottom-nav>

      <SolicitudesRegistro v-if="boton==1"></SolicitudesRegistro>
      <GestionUs v-if="boton==2"></GestionUs>
</v-app>
</template>

<script>
import SolicitudesRegistro from "../components/SolicitudesRegistro.vue"
import GestionUs from "../components/GestionUs.vue"
export default {
    components: { SolicitudesRegistro, GestionUs },
    data () {
    return {
      boton: 1
    }
  },
  
}
</script>

<style >
@import "../assets/css/styles.css";
</style>
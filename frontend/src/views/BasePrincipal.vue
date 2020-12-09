<template>
    <v-app>
      <v-container class="mapa"> 
          <mapa></mapa>
      </v-container>

  </v-app>
</template>

<script>
import Mapa from '../components/Mapa.vue'
export default {
  components: { Mapa },
  name: 'BasePrincipal',
  data: () => ({
      idUs: null,
      tipo: null,
    }),
    mounted(){
      this.tipo = this.$store.state.tipo;
      this.idUs = this.$store.state.idUs;
    }
}
</script>

<style>

</style>
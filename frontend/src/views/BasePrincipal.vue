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
    this.tipo = this.$route.params.tipo;
    this.idUs = this.$route.params.idUs;
    console.log(this.tipo);
    console.log(this.idUs);
  }
}
</script>

<style>

</style>
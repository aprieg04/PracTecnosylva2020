<template>
<v-app>
    <h1> Editor de usuario</h1>
</v-app>
</template>

<script>
export default {
  name: "EditarUsuario",
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
@import "../assets/css/styles.css";
</style>
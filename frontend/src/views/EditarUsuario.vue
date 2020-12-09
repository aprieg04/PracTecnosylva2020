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
    this.tipo = this.$route.params.tipo;
    this.idUs = this.$route.params.idUs;
    console.log(this.tipo);
    console.log(this.idUs);
  }
}
</script>

<style>
@import "../assets/css/styles.css";
</style>
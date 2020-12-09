<template>
<v-app>
    <h1> Gestor Capas</h1>
</v-app>
</template>

<script>
export default {
  name: "GestionCapas",
  data: () => ({
    idUs: null,
    tipo: null,
  }),
  mounted(){
    this.tipo = this.$route.params.tipo;
    this.idUs = this.$route.params.idUs;
    console.log
  }
}
</script>
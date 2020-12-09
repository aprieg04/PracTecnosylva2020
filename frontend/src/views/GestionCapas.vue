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
    this.tipo = this.$store.state.tipo;
    this.idUs = this.$store.state.idUs;
  }
}
</script>
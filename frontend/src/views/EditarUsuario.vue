<template>
<v-app>
          <header-component></header-component>

    <span> Editor de usuario</span>
</v-app>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
  components: { HeaderComponent },
name: 'EditarUsuario'
}
</script>

<style>
@import "../assets/css/styles.css";
</style>
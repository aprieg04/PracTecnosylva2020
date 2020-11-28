<template>
  <header id="header">
    <div class="center">
      <!-- Logo-->
      <div id="logo">
        <img
          src="../assets/images/tecnosylva.jpg"
          class="app-logo"
          alt="Logotipo"
        />

        <span id="brand"> <strong> Tecnosylva</strong> Layer Control </span>
      </div>
      <!-- MENU -->
      <nav id="menu">
        <ul>
          <li>
            <span> Usuario:</span>
            <router-link :to="{ name: 'EditarUsuario.vue' }" target="_blank">
              {{username}}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }" target="_blank">
              Salir
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- Limpiar los flotados para que no se suban-->
      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    username: String,
    type: String
  },
  
};
</script>

<style>
</style>
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
              {{username}}
          </li>
          <li>
            <v-btn color="#B32B2B" dark @click="cerrarSesion()">
              Salir
            </v-btn>
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
  methods: {
    cerrarSesion(){
      this.$store.commit("setIdUs", null);
      this.$store.commit("setTipo", null);
      this.$router.push({ name: "Home"})
    }
  }
  
};
</script>

<style>
</style>
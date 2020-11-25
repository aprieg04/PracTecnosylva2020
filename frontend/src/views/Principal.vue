<template>
  <v-app>
    <header-component username="Marco"></header-component>
    <side-bar></side-bar>
    <div>{{$route.params.id}}</div>
  </v-app>
</template>∫

<script>
import HeaderComponent from "../views/HeaderComponent.vue";
import SideBar from "../views/SideBar.vue";

export default {
  components: { HeaderComponent, SideBar },
  name: "Principal",
  
  
};
</script>

<style >
@import "../assets/css/styles.css";
</style>

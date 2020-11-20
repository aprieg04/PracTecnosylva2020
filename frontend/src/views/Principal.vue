<template>
    <v-app>
   <header-component></header-component>
   <side-bar>
       <ul class="sidebar-panel-nav">
       <li><a href="#home">Home</a></li>
       <li><a href="#about">About</a></li>
       <li><a href="#contact">Contact</a></li>
     </ul>
   </side-bar>
    </v-app>
</template>

<script>

import HeaderComponent from "../views/HeaderComponent";
import SideBar from '../views/SideBar.vue';


export default {
  components: { HeaderComponent,SideBar },
name: 'Principal'
}
</script>

<style >
@import "../assets/css/styles.css";
</style>

<template>
  <v-app>
    <header-component :username="username"></header-component>
    <side-bar :username="username"></side-bar>
    <footer-component></footer-component>
  </v-app>
</template>∫
<script>
import FooterComponent from '../components/Footer.vue';
import HeaderComponent from "../components/HeaderComponent.vue";
import SideBar from "../components/SideBar.vue";

export default { 

  components: { HeaderComponent, SideBar, FooterComponent },
  name: "Principal",
  data:
   function(){return {username: ""}},
   /* El mounted, hace que podamos pasarlo a la variable. */
   mounted(){
     this.username=this.$route.params.username;
     this.type=this.$router.params.type;
     
   }
};
</script>

<style >
@import "../assets/css/styles.css";
</style>

/* Pasamos mediante props del vue router, una url con el nombre de usuario
el cual corresponde con el id que que hemos guardado en el data. 
Depues pasamos el username del data, a través del v-bind a la prop del 
hijo <HeaderCOmponent> */
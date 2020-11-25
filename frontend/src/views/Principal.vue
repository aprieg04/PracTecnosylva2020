<template>
  <v-app>
    <header-component :username="username"></header-component>
    <side-bar></side-bar>
    
  </v-app>
</template>∫
<script>
import HeaderComponent from "../views/HeaderComponent.vue";
import SideBar from "../views/SideBar.vue";

export default { 

  components: { HeaderComponent, SideBar },
  name: "Principal",
  data:
   function(){return {username: ""}},
   /* El mounted, hace que podamos pasarlo a la variable. */
   mounted(){
     this.username=this.$route.params.id;
     
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
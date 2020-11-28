<template>
  <v-app>
    <header-component :username="username" :type="type"></header-component>
     <v-card class="v-card-sidebar">
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/images/Marco.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{username}}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon light>
        mdi-border-color
      </v-icon>
         <span class="mdi mdi-account-card-details">

         </span>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>

  
    <router-view></router-view>

    <footer-component></footer-component>
  </v-app>
</template>

<script>
import FooterComponent from '../components/Footer.vue';
import HeaderComponent from "../components/HeaderComponent.vue";

export default { 

  components: { HeaderComponent, FooterComponent },
  name: "Principal",
  data: () => ({
      drawer: true,
      items: [
        { title: "Editar perfil", icon: "mdi-account-edit", link: "/principal/editarUsuario" },
        { title: "Gestionar capas", icon: "mdi-layers", link: "/principal/gestionCapas" },
        { title: "Gestionar usuarios", icon: "mdi-account-multiple-outline", link: "/principal/gestionUsuarios" },

      ],
      mini: true,
  }),
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
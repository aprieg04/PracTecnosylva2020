<template>
  <v-app>
    <header-component :username="username" :type="type"></header-component>
    <div class="contenedor">
 <!-- Componente SIDEBAR -->
    <v-card class="v-card-sidebar left" >
      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="../assets/images/Marco.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ username }}</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon light> mdi-border-color </v-icon>
            <span class="mdi mdi-account-card-details"> </span>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>
<!-- "{ name: item.name, params: {username: this.username} }" -->
        <v-list dense>
          <v-list-item :to="`/user/${this.username}/`">
            <v-list-item-icon>
              <v-icon>mdi-map</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Principal</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="`/user/${this.username}/editarUsuario`">
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Editar perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="`/user/${this.username}/gestionCapas`">
            <v-list-item-icon>
              <v-icon>mdi-layers</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Gestión de capas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="`/user/${this.username}/gestionUsuarios`">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Gestión de usuarios</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
    </v-card>
    <!-- FIN COMPONENTE SIDEBAR -->

    <router-view class="right"></router-view>

 </div>
    

    <footer-component></footer-component>
  </v-app>
</template>

<script>
import FooterComponent from "../components/Footer.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
  components: { HeaderComponent, FooterComponent },
  name: "Principal",
  data: () => ({
    drawer: true,
    username: "",
    type: null,
    items: [
      {
        title: "Principal",
        icon: "mdi-map",
        link: `/user/${this.username}/`,
      },
      {
        title: "Editar perfil",
        icon: "mdi-account-edit",
        link: `/user/${this.username}/editarUsuario`,
      },
      {
        title: "Gestionar capas",
        icon: "mdi-layers",
        link: `/user/${this.username}/gestionCapas`,
      },
      {
        title: "Gestionar usuarios",
        icon: "mdi-account-multiple-outline",
        link: `/user/${this.username}/gestionUsuarios`,
      },
    ],
    mini: true,
  }),
  function() {
    return { username: "" };
  },
  /* El mounted, hace que podamos pasarlo a la variable. */
  beforeMount() {
    this.username = this.$route.params.username;
    this.type = this.$router.params.type;
    console.log(this.username);
    console.log(this.type);
  },
  /*
  mounted() {
    this.isLogged();
  },
  methods: {
    isLogged(){
      if(this.type==null)
      {
        /*Si no esta logeado lo mandamos al login
        this.$router.push({ name: "Login"})
      }
    }
  }
  */

};
</script>

<style >
@import "../assets/css/styles.css";
</style>

/* Pasamos mediante props del vue router, una url con el nombre de usuario
el cual corresponde con el id que que hemos guardado en el data. 
Depues pasamos el username del data, a través del v-bind a la prop del 
hijo <HeaderCOmponent> */
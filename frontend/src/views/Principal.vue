<template>
  <v-app>
    <header-component :username="username" :tipo="tipo"></header-component>
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
          <v-list-item @click="cargaPrincipal()">
            <v-list-item-icon>
              <v-icon>mdi-map</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Principal</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="cargaEditarUsuario()">
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Editar perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="cargaGestionCapas()">
            <v-list-item-icon>
              <v-icon>mdi-layers</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Gestión de capas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="this.tipo==2" :to="`/user/${this.username}/gestionUsuarios`">
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
    idUs: null,
    tipo: null,
    mini: true,
  }),
  /* El mounted, hace que podamos pasarlo a la variable. */
  mounted() {
    this.username = this.$route.params.username;
    this.tipo = this.$route.params.tipo;
    this.idUs = this.$route.params.idUsuario;
    this.isLogged();
    console.log(this.tipo);
    console.log(this.idUs);
    this.$store.commit("setIdUs", this.idUs);
    this.$store.commit("setTipo", this.tipo);
  
  },
  methods: {
    isLogged(){
      if(this.tipo==null)
      {
        //Si no esta logeado lo mandamos al login
        this.$router.push({ name: "Login"})
      }
    },
    cargaPrincipal(){
      this.$router.push({     
      path: `/user/${this.username}/`,
      })
    },
    cargaEditarUsuario(){
      this.$router.push({  
        path: `/user/${this.username}/editarUsuario`,
      })
    },
    cargaGestionCapas(){
      this.$router.push({
        path: `/user/${this.username}/gestionCapas`,
      })
    }
  } 
};
</script>

<style >
@import "../assets/css/styles.css";
</style>

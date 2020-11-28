<template>
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

    <v-main>
        <router-view></router-view>
    </v-main>

  </v-card>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      drawer: true,
      items: [
       
        { title: "Editar perfil", icon: "mdi-account-edit", link: "/editarPerfil" },
        { title: "Gestionar capas", icon: "mdi-layers", link: "/gestionarCapas" },
        { title: "Gestionar usuarios", icon: "mdi-account-multiple-outline", link: "/gestionarUsuarios" },

      ],
      mini: true,
    };
  },
  props: {
    username: String,
    type: String
  },
};
</script>

<style>
@import "../assets/css/styles.css";
</style>
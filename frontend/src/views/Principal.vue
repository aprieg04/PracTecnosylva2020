<template>
    <v-app>
   <header-component></header-component>
    </v-app>
</template>

<script>

import HeaderComponent from "../views/HeaderComponent";


export default {
  components: { HeaderComponent },
name: 'Principal'
}
</script>

<style >
@import "../assets/css/styles.css";
</style>

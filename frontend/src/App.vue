<template>
    <v-app>
        <!-- Necesario hacer un vif de show para el login -->
      <router-view></router-view>
    </v-app>
</template>

<script>


export default {

    name: "App",
    data(){
        return{};
    }
};
</script>
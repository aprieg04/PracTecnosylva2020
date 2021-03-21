<template>
  <v-app id="Home">
  <v-div>
    <v-content>
      <v-parallax height="1080" src="https://www.10wallpaper.com/wallpaper/1920x1080/1605/Blue_earth_planet-Expanse_Space_HD_Wallpaper_1920x1080.jpg"> 
        <v-card color="transparent" flat>
            <v-toolbar app clipped-left flat color="transparent">
            <v-tabs v-model="tab" dark color="white">
                <v-tab v-for="item in items" :key="item"> {{ item.tab }}</v-tab>
            </v-tabs>

            <router-link to="/login" class="li">
                <v-tab right dark color="white">
                    <v-icon>mdi-login</v-icon>

                    <span style="margin-left: 7px;">Iniciar sesión</span>
                </v-tab>
            </router-link>

            <router-link to="/register" class="li">
                <v-tab right dark color="white" >
                    <v-icon>mdi-account-plus</v-icon>
                    <span style="margin-left: 7px;">Registro</span>
                </v-tab>
            </router-link>

            </v-toolbar>
        </v-card>

        <v-layout column align-center>
            <v-img max-height="160" max-width="250" src="../assets/images/logo1.png"></v-img>
        </v-layout>
        


        <v-footer color="transparent" height="50">
            <v-card-text style="color: white; font-size: 12px">© 2020 Tecnosylva. All rights reserved.</v-card-text>
        </v-footer>

        </v-parallax>
        </v-content>
    </v-div>
  </v-app>
</template>

<script>
export default {
    data: () => ({
        tab: null,
        items: [
        { tab: 'Home'},
        { tab: 'About us'},
        ],
    })
}
</script>

<style>

@import "../assets/css/styles.css";
</style>
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
            <v-img max-height="220" max-width="340" src="../assets/images/logo1.png"></v-img>
        </v-layout>
        
        <v-card class="card">
            <v-tabs-items v-model="tab">
                <v-tab-item
                v-for="item in items"
                :key="item.tab"
                >
                <v-card flat class="cardtext">
                    <v-card-text>{{ item.content }}</v-card-text>
                </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>


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
        { tab: 'Home', content: 'Contenido home' },
        { tab: 'About us', content: 'Contenido about us' },
        ],
    })
}
</script>

<style>
.li{
    text-decoration: none;
    
}
.li:link{
    color: white;
}
.li:hover{
    color: #F4C671;
}
.card{
    background-color:rgb(192,192,192);
    opacity:0.7;
    height:1000px;
    margin-left:70px;
    margin-right:70px;
    margin-top:70px;
}
.cardtext
{
    margin-bottom:70px;
    color:black;
    align:center;
}
</style>
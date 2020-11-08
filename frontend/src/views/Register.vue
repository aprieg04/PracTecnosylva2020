<template>
  <v-app id="register">
  
    <v-content>
      <v-parallax height="1080" src="https://www.10wallpaper.com/wallpaper/1920x1080/1605/Blue_earth_planet-Expanse_Space_HD_Wallpaper_1920x1080.jpg"> 
        <v-card color="transparent" flat>
            <v-toolbar app clipped-left flat color="transparent">
            <v-tabs dark>
                <v-tab right dark color="white"> 
                    <router-link to="/" class="li">
                        <v-tab right dark color="white">
                            <v-icon>mdi-home</v-icon>

                            <span>Home</span>
                        </v-tab>
                     </router-link>
                </v-tab>
            </v-tabs>

            <router-link to="/login" class="li">
                <v-tab right dark color="white">
                    <v-icon>mdi-login</v-icon>

                    <span>Iniciar sesión</span>
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
            <v-img max-height="220" max-width="340" src="../assets/logo1.png"></v-img>
        </v-layout>
    
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="#404D57">                    
                  <v-toolbar-title>Registro</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="mdi-account-box" name="nombreLogin" label="Nombre de usuario" type="text" v-model="nombreLogin"></v-text-field>
                    <v-text-field prepend-icon="mdi-email-outline" name="emailLogin" label="E-mail" type="email" v-model="emailLogin"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" name="passLogin" label="Contraseña" id="password" type="password" v-model="passLogin"></v-text-field>
                    <v-text-field prepend-icon="mdi-calendar" name="birthdate" label="Fecha de nacimiento" type="date" v-model="birthDate"></v-text-field>
                    <v-text-field prepend-icon="mdi-phone" name="phonenumber" label="Numero de teléfono" id="phoneNumber" type="number" v-model="phonenumber"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-row align="center" justify="space-around">
                    <v-btn class="white--text" height="60" width="200" color="#404D57" v-on:click="usuarioLogin">Registrarme</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-parallax>
    </v-content>
  </v-app>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js"></script>
  
<script>
export default {
  name: "App",
  components: {}
}
</script>
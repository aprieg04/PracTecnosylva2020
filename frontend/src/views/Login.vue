<template>
  <v-app id="login">
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
    
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="#404D57">                    
                  <v-toolbar-title>Inicio de sesión</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="mdi-account-box" name="nombreLogin" label="Nombre de usuario" type="text" v-model="nombreLogin"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" name="passLogin" label="Contraseña" id="password" type="password" v-model="passLogin"></v-text-field>
                  </v-form>
                </v-card-text>
                <p v-if="error" class="error">Usuario o contraseña incorrectos.</p>
                <v-card-actions>
                  <v-row align="center" justify="space-around">
                    <v-btn class="white--text" height="60" width="200" color="#404D57" v-on:click="usuarioLogin">Iniciar sesión</v-btn>
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
import auth from "../logic/auth.js"
export default {
  name: "App",
  components: {},
  methods: {
    async usuarioLogin() {
      if (
        this.nombreLogin == null ||
        this.nombreLogin == "" ||
        this.passLogin == null ||
        this.passLogin == ""
      ) {
        alert("Algún campo está vacío. Asegúrese de rellenar todos los campos.");
      } else {
        try 
        {
          await auth.usuarioLogin(this.nombreLogin, this.passLogin).then(
          response => {
            console.log(response)
            if(response.data.users[0].fk_IdEstado==1) //No admitido por administrador
            {
              alert("El usuario introducido se halla pendiente de aceptación por parte de un administrador. Revise su correo. ")
            }
            else{
              if(response.data.login!=false){
                auth.setUserLogged(response.data.accessToken);
                console.log("Token")
                console.log(response.data.accessToken)
                if(response.data.users[0].tipoUsuario==1)
                {
                  this.$router.push({
                  name: "user",
                  params: { userId: response.data.users[0].idUsuario}

                 });
                }
                else{
                  this.$router.push({
                  name: "PrincipalAdmin"
                 });
                }
              }
              else
              {
                alert("El usuario no existe. Compruebe que tanto nombre como contraseña como el tipo de usuario para el que hace la petición son los correctos.");
              }
            }
          },
          response => {
            alert(response);
          }
        );
        }catch (error) {
        console.log(error);
        this.error = true;
        }
      }
    }
  }
}
</script>

<style>

@import "../assets/css/styles.css";
</style>
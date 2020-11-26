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
            <v-img max-height="220" max-width="340" src="../assets/images/logo1.png"></v-img>
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
                    <v-text-field prepend-icon="mdi-account-box" name="nombreRegistro" label="Nombre de usuario" type="text" v-model="nombreRegistro"></v-text-field>
                    <v-text-field prepend-icon="mdi-email-outline" name="emailRegistro" label="E-mail" type="email" v-model="emailRegistro"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" name="passRegistro" label="Contraseña" id="password" type="password" v-model="passRegistro"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock-check" name="passRep" label="Repita contraseña" id="passwordVer" type="password" v-model="passRegistroVer"></v-text-field>
                    <v-text-field prepend-icon="mdi-phone" name="phonenumber" label="Numero de teléfono" id="phoneNumber" type="number" v-model="phonenumber"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-row align="center" justify="space-around">
                    <v-btn class="white--text" height="60" width="200" color="#404D57" v-on:click="usuarioRegistro">Registrarme</v-btn>
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
    async usuarioRegistro() {
      if (
        this.nombreRegistro == null ||
        this.nombreRegistro == "" ||
        this.passRegistro == null ||
        this.passRegistro == "" ||
        this.emailRegistro == "" ||
        this.emailRegistro == null ||
        this.passRegistroVer== "" ||
        this.passRegistroVer == null
      ) {
        alert("Algún campo está vacío. Asegúrese de rellenar todos los campos.");
      } 
      else if(this.passRegistro != this.passRegistroVer){
        alert("Las contraseñas no coinciden.");
      }
      else {
        try 
        {
          await auth.usuarioRegistro(this.nombreRegistro, this.emailRegistro, this.passRegistro, this.phonenumber).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              alert("La petición de registro ha sido creada, un administrador la validará y le enviará un correo.");
              auth.setUserLogged(response.data.accessToken);
               this.$router.push({
                  name: "Home"
                 });
            }
            else
            {
              alert("Usuario existente. Ya existe un usuario con el mismo nombre o email aportados.");
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
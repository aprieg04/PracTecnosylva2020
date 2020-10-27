<template>
  <v-app id="login">
    <v-content>
      <v-parallax height="1080" src="https://www.10wallpaper.com/wallpaper/1920x1080/1605/Blue_earth_planet-Expanse_Space_HD_Wallpaper_1920x1080.jpg">          
        <v-layout align-center column justify-center>
          <h1 class="display-3 font-weight-bold">
            <span style="color: white">Layer Management</span>
          </h1>
        </v-layout>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="#404D57">                    
                  <v-toolbar-title>Identifícate</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="mdi-account-box" name="nombreLogin" label="Nombre de usuario" type="text" v-model="nombreLogin"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" name="passLogin" label="Contraseña" id="password" type="password" v-model="passLogin"></v-text-field>
                  </v-form>
                </v-card-text>
                  <v-overflow-btn padding="10px" class="my-2" :items="tipos_usuario" label="Tipo de usuario" item-value="text"></v-overflow-btn>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="white--text" color="#404D57" v-on:click="usuarioLogin">Identificarse</v-btn>
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
  components: {},
  methods: {
    usuarioLogin: function() {
      console.log(location.host);
      if (
        this.nombreLogin == null ||
        this.nombreLogin == "" ||
        this.passLogin == null ||
        this.passLogin == ""
      ) {
        alert("Los campos están vacíos.");
      } else {
        var datos = {
          nombUsuario: this.nombreLogin,
          password: this.passLogin
        };
        this.$http.post("http://localhost:3000/loginUsuario", datos).then(
          response => {
            if(response.body != ""){
                this.$router.push({
                name: "Principal",
                params: { idUsuario: response.body[0].id, nombreUsuario: response.body[0].nombreUsuario }
              });
            }
              
            else alert("Nombre o contraseña son incorrectos");
          },
          response => {
            alert("Error al enviar los datos");
          }
        );
      }
    },
    sleep: function(milliseconds){
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }
  },
  data: () => ({
    tipos_usuario: [
      { text: 'Standart' },
      { text: 'Administrador' },
    ],
  }),
}
</script>

<style lang="sass">
  @import '~vuetify/src/styles/styles.sass'

$overflow-append-inner-width: 100px
</style>
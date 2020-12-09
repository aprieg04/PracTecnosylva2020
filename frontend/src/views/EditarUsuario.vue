<template>
<v-app>
     <v-card>
        <v-card-title class="headline red darken-3 white--text" primary-title>
            Editar perfil
        </v-card-title>
        <v-card-text>
            <v-form>
            <v-text-field prepend-icon="mdi-account-box" label="Nombre de usuario" type="text" v-model="user.nombre"></v-text-field>
            <v-text-field prepend-icon="mdi-email-outline" label="E-mail" type="email" v-model="user.email" ></v-text-field>
            <v-text-field prepend-icon="mdi-lock" label="Contraseña" id="password" type="password" v-model="user.pass"></v-text-field>
            <v-text-field prepend-icon="mdi-phone" label="Numero de teléfono" id="phoneNumber" type="number" v-model="user.phoneNumber" ></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="editUsuario();">Guardar</v-btn>
        </v-card-actions>
    </v-card>
</v-app>
</template>

<script>
import queries from "../logic/queries.js";

export default {
  name: "EditarUsuario",
  data: () => ({
    idUs: null,
    tipo: null,
    user: {
          nombre: "",
          pass: "",
          email: "",
          phoneNumber: "",
        },
  }),
  mounted(){
    this.tipo = this.$store.state.tipo;
    this.idUs = this.$store.state.idUs;
    this.getUsuario();
  },
  methods: {
      getUsuario(){
          console.log("Entro getUsuario")
          console.log(this.idUs);
         queries.getUsuario(this.idUs)
          .then((response) => {
              console.log(response)
              
              this.user.nombre = response.data[0].nombre;
              this.user.pass = response.data[0].pass;
              this.user.email = response.data[0].email;
              this.user.phoneNumber = response.data[0].phoneNumber;

          })
          .catch((e) => {
              console.log("Error vergas")
              console.log(e);
          });
      },
      editUsuario() {
        if (
            this.user.nombre == null ||
            this.user.nombre == "" ||
            this.user.pass == null ||
            this.user.pass == "" ||
            this.user.email== "" ||
            this.user.email == null ||
            this.user.phoneNumber == "" ||
            this.user.phoneNumber == null
        ) {
            alert("Algún campo está vacío. Asegúrese de rellenar todos los campos.");
        } 
        else {
          try 
        {
          queries.editUsuarioPerfil(this.idUs, this.user.nombre, this.user.email, this.user.pass, this.user.phoneNumber).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              console.log("Usuario editado")
              alert("Campos editados correctamente");
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

<style>
@import "../assets/css/styles.css";
</style>
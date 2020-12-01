<template>
   <div id="app">
        <v-app id="inspire">
        <v-card-title>Gestión de usuarios</v-card-title>

        <!-- Nuevo usuario -->
        <div class="text-xs-center">
        <v-dialog
        v-model="dialog"
        width="1000"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="#B32B2B" v-on="on">
             <v-icon>mdi-account-plus-outline</v-icon>
             <span style="margin-left: 7px; margin-right: 7px;">Crear usuario</span>
        </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Nuevo usuario
          </v-card-title>
  
          <v-card-text>
          <v-spacer/>
                  <v-form>
                    <v-text-field prepend-icon="mdi-account-box" name="nombreRegistro" label="Nombre de usuario" type="text" v-model="nombreRegistro"></v-text-field>
                    <v-text-field prepend-icon="mdi-email-outline" name="emailRegistro" label="E-mail" type="email" v-model="emailRegistro"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" name="passRegistro" label="Contraseña" id="password" type="password" v-model="passRegistro"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock-check" name="passRep" label="Repita contraseña" id="passwordVer" type="password" v-model="passRegistroVer"></v-text-field>
                    <v-text-field prepend-icon="mdi-phone" name="phonenumber" label="Numero de teléfono" id="phoneNumber" type="number" v-model="phonenumber"></v-text-field>
                    <v-text-field prepend-icon="mdi-account-key-outline" name="tipo" label="Tipo" id="tipo" type="number" v-model="tipoReg"></v-text-field>
                  </v-form>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
             <v-btn class="white--text" height="60" width="200" color="#B32B2B" v-on:click="nuevoUsuario(); dialog=false;">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>
      

            <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :loading="loadingvariable"
            >
            <template v-slot:item.actions="{ item }">
                <v-icon class="mx-2" color="blue" @click="editarUsuario()">mdi-pencil</v-icon>
                <v-icon color="red" @click="denegarSolicitud(item.idUsuario)">mdi-delete</v-icon>
            </template>
            </v-data-table>
        </v-app>
    </div>
</template>

<script>
import queries from "../logic/queries.js";
import auth from "../logic/auth.js";

export default{
    mounted() {
        this.obtenerUsuarios();
        
    },
    data () {
    return {
        loadingvariable: true,
        list: [],
        headers: [
            { text: 'ID', align: 'start', value: 'idUsuario' },
            { text: 'Nombre de usuario', value: 'nombre'},
            { text: 'Número de teléfono', value: 'phoneNumber' },
            { text: 'Email', value: 'email' },
            { text: 'Tipo', value: 'tipoUsuario' },
            { text: 'Editar / Eliminar', value: 'actions', sortable: false }
        ],
    }
  },
  methods: {
      obtenerUsuarios() {
          this.loadingvariable=true;
          queries.obtenerUsuarios()
          .then((response) => {
              console.log(response)
              this.list = response.data;
              this.getDisplay(this.list);
              this.loadingvariable=false;
          })
          .catch((e) => {
              console.log(e);
              this.loadingvariable=false;
          });
      },
      getDisplay(list){
          return {
              nombre: list.nombre,
              idUsuario: list.idUsuario,
              email: list.email,
              phoneNumber: list.phoneNumber,

          }
      },
      denegarSolicitud(idUsuario) {
          console.log(idUsuario)
          queries.denegarSolicitud(idUsuario)
          .then((response) => {
          this.$router.go()
              console.log(response);
          })
      },
      async nuevoUsuario() {
        if (
            this.nombreRegistro == null ||
            this.nombreRegistro == "" ||
            this.passRegistro == null ||
            this.passRegistro == "" ||
            this.emailRegistro == "" ||
            this.emailRegistro == null ||
            this.passRegistroVer== "" ||
            this.passRegistroVer == null ||
            this.tipoReg == "" ||
            this.tipoReg == null
        ) {
            alert("Algún campo está vacío. Asegúrese de rellenar todos los campos.");
        } 
        else if(this.passRegistro != this.passRegistroVer){
            alert("Las contraseñas no coinciden.");
        }
        else if(this.tipoReg > 2 || this.tipoReg < 0){
            alert("El tipo del usuario solo puede ser 1 (Standard) ó 2 (Admin)");
        }
        else {
          try 
        {
          await auth.nuevoUsuario(this.nombreRegistro, this.emailRegistro, this.passRegistro, this.phonenumber, this.tipoReg).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              console.log("Usuario creado")
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
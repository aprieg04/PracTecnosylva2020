<template>
   <div id="app">
        <v-app id="inspire">
        <v-card-title>Gestión de usuarios</v-card-title>

        <!-- Nuevo usuario -->
        <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="#B32B2B" v-on="on" dark>
             <v-icon>mdi-account-plus-outline</v-icon>
             <span style="margin-left: 7px; margin-right: 7px;">Crear usuario</span>
        </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="headline red darken-3" primary-title>
            Nuevo usuario
          </v-card-title>

        <v-divider></v-divider>
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
             <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialog=false; nuevoUsuario();">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>
      <!-- Fin nuevo usuario -->

            <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :loading="loadingvariable"
            >
            <template v-slot:item.editar="{ item }">
            <!-- Editar usuario -->
              <div class="text-xs-center">
                <v-dialog v-model="dialogEdit" width="500">
                <template v-slot:activator="{ on }">
                      <v-icon color="blue" v-on="on">mdi-pencil</v-icon>
                </template>
                    <v-card>
                    <v-card-title class="headline red darken-3" primary-title>
                      Editar usuario
                    </v-card-title>

                  <v-divider></v-divider>
                    <v-card-text>
                    <v-spacer/>
                            <v-form>
                              <v-text-field prepend-icon="mdi-account-box" label="Nombre de usuario" type="text" v-model="nombreEdit"></v-text-field>
                              <v-text-field prepend-icon="mdi-email-outline" label="E-mail" type="email" v-model="emailEdit" ></v-text-field>
                              <v-text-field prepend-icon="mdi-lock" label="Contraseña" id="password" type="password" v-model="passEdit"></v-text-field>
                              <v-text-field prepend-icon="mdi-phone" label="Numero de teléfono" id="phoneNumber" type="number" v-model="phonenumberEdit" ></v-text-field>
                              <v-text-field prepend-icon="mdi-account-key-outline" label="Tipo" id="tipo" type="number" v-model="tipoRegEdit"></v-text-field>
                            </v-form>
                    </v-card-text>
            
                    <v-divider></v-divider>
            
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialogEdit=false; editUsuario(item.idUsuario);">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              </template>

              <template v-slot:item.eliminar="{ item }">
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
        dialog: false,
        dialogEdit: false,
        nombreRegistro: null, passRegistro: null, emailRegistro: null, tipoReg: null, passRegistroVer: null, phoneNumber: null,
        nombreEdit: null, passEdit: null, emailEdit: null, phonenumberEdit: null, tipoRegEdit: null, 
        loadingvariable: true,
        list: [],
        headers: [
            { text: 'ID', align: 'start', value: 'idUsuario' },
            { text: 'Nombre de usuario', value: 'nombre'},
            { text: 'Número de teléfono', value: 'phoneNumber' },
            { text: 'Email', value: 'email' },
            { text: 'Tipo', value: 'tipoUsuario' },
            { text: 'Estado', value: 'fk_idEstado' },
            { text: 'Editar ', value: 'editar', sortable: false },
            { text: 'Eliminar ', value: 'eliminar', sortable: false },
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
              fk_idEstado: list.fk_idEstado,
              tipoUsuario: list.tipoUsuario

          }
      },
      denegarSolicitud(idUsuario) {
          console.log(idUsuario)
          queries.denegarSolicitud(idUsuario)
          .then((response) => {
          this.obtenerUsuarios();
          console.log(response);
          })
      },
      nuevoUsuario() {
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
          auth.nuevoUsuario(this.nombreRegistro, this.emailRegistro, this.passRegistro, this.phonenumber, this.tipoReg).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              console.log("Usuario creado")
              this.obtenerUsuarios();
              this.nombreRegistro=null;
              this.passRegistro=null;
              this.emailRegistro=null;
              this.passRegistroVer=null;
              this.tipoReg=null;
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
      },
      editUsuario(idUsuario) {
        if (
            this.nombreEdit == null ||
            this.nombreEdit == "" ||
            this.passEdit == null ||
            this.passEdit == "" ||
            this.emailEdit == "" ||
            this.emailEdit == null ||
            this.tipoRegEdit == "" ||
            this.tipoRegEdit == null
        ) {
            alert("Algún campo está vacío. Asegúrese de rellenar todos los campos.");
        } 
        else if(this.tipoReg > 2 || this.tipoReg < 0){
            alert("El tipo del usuario solo puede ser 1 (Standard) ó 2 (Admin)");
        }
        else {
          try 
        {
          queries.editUsuario(idUsuario, this.nombreEdit, this.emailEdit, this.passEdit, this.phonenumberEdit, this.tipoRegEdit).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              console.log("Usuario editado")
              this.obtenerUsuarios();
              this.nombreEdit=null;
              this.passEdit=null;
              this.emailEdit=null;
              this.tipoRegEdit=null;
              this.phonenumberEdit=null;
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
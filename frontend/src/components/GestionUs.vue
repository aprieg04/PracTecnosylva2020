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
             <!-- Editar usuario -->
            <template v-slot:item.editar="{ item }" >
              <div class="text-xs-center">
                <v-dialog v-model="dialogEdit" width="500">
                      <template v-slot:activator="{ on }">
                      <v-icon color="blue" v-on="on" @click="editItem(item)">mdi-pencil</v-icon>
                      </template>

                  <v-card>
                    <v-card-title class="headline red darken-3" primary-title>
                      Editar usuario
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-text-field prepend-icon="mdi-account-box" label="Nombre de usuario" type="text" v-model="editedItem.nombre"></v-text-field>
                        <v-text-field prepend-icon="mdi-email-outline" label="E-mail" type="email" v-model="editedItem.email" ></v-text-field>
                        <v-text-field prepend-icon="mdi-lock" label="Contraseña" id="password" type="password" v-model="editedItem.pass"></v-text-field>
                        <v-text-field prepend-icon="mdi-phone" label="Numero de teléfono" id="phoneNumber" type="number" v-model="editedItem.phoneNumber" ></v-text-field>
                        <v-text-field prepend-icon="mdi-account-key-outline" label="Tipo" id="tipo" type="number" v-model="editedItem.tipoUsuario"></v-text-field>
                      </v-form>
                    </v-card-text>
            
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialogEdit=false; editUsuario(item.idUsuario);">Guardar</v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              </template>
            <!-- FIN Editar usuario -->

            <!-- Eliminar usuario -->
              <template v-slot:item.eliminar="{ item }" >
              <div class="text-xs-center">
                <v-dialog v-model="dialogDelete" width="550">
                  <template v-slot:activator="{ on }">
                  <v-icon color="red" v-on="on">mdi-delete</v-icon>
                  </template>

                  <v-card>
                    <v-card-title class="headline">¿Estás seguro de querer eliminar este usuario?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialogDelete=false; denegarSolicitud(item.idUsuario);">OK</v-btn>
                     
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              </template>
              <!-- FIN Eliminar usuario -->
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
        diaogDelete: false,
        nombreRegistro: null, passRegistro: null, emailRegistro: null, tipoReg: null, passRegistroVer: null, phoneNumber: null,
        loadingvariable: true,
        editedItem: {
          nombre: "",
          pass: "",
          email: "",
          phoneNumber: "",
          tipoUsuario: 1,
        },
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
    editItem (item) {
    
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },
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
            this.editedItem.nombre == null ||
            this.editedItem.nombre == "" ||
            this.editedItem.pass == null ||
            this.editedItem.pass == "" ||
            this.editedItem.email== "" ||
            this.editedItem.email == null ||
            this.editedItem.phoneNumber == "" ||
            this.editedItem.phoneNumber == null
        ) {
            alert("Algún campo está vacío. Asegúrese de rellenar todos los campos.");
        } 
        else if(this.editedItem.tipoUsuario > 2 || this.editedItem.tipoUsuario < 0){
            alert("El tipo del usuario solo puede ser 1 (Standard) ó 2 (Admin)");
        }
        else {
          try 
        {
          queries.editUsuario(idUsuario, this.editedItem.nombre, this.editedItem.email, this.editedItem.pass, this.editedItem.phoneNumber, this.editedItem.tipoUsuario).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              console.log("Usuario editado")
              this.obtenerUsuarios();
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
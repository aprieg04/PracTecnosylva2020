<template>
   <div id="app">
        <v-app id="inspire">
        <v-card-title>Gestión de capas</v-card-title>

        <!-- Nueva capa -->
        <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="#B32B2B" v-on="on" dark>
             <v-icon>mdi-library-plus</v-icon>
             <span style="margin-left: 7px; margin-right: 7px;">Añadir capa</span>
        </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="headline red darken-3 white--text" primary-title>
            Nueva capa
          </v-card-title>

        <v-divider></v-divider>
          <v-card-text>
          <v-spacer/>
            <v-form>
              <v-text-field prepend-icon="mdi-layers" label="Nombre *" type="text" v-model="nombreLayerNueva"></v-text-field>
              <v-text-field prepend-icon="mdi-link-variant" label="URL *" type="text" v-model="urlLayerNueva"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" label="Apikey" type="password" v-model="apikeyLayerNueva"></v-text-field>
              <v-text-field prepend-icon="mdi-keyboard" label="Descripción *" type="text" v-model="descripcionLayerNueva"></v-text-field>
            </v-form>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
             <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialog=false; nuevaCapa();">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>
      <!-- Fin nueva capa -->

            <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="10"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :loading="loadingvariable"
            >
             <!-- Editar capa -->
            <template v-slot:item.editar="{ item }" >
              <div class="text-xs-center">
                <v-dialog v-model="dialogEdit" width="500">
                      <template v-slot:activator="{ on }">
                      <v-icon color="blue" v-on="on" @click="editItem(item)">mdi-pencil</v-icon>
                      </template>

                  <v-card>
                    <v-card-title class="headline red darken-3 white--text" primary-title>
                      Editar capa
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                       <v-text-field prepend-icon="mdi-layers" label="Nombre *" type="text" v-model="editedItem.nombre"></v-text-field>
                    <v-text-field prepend-icon="mdi-link-variant" label="URL *" type="text" v-model="editedItem.url"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" label="Apikey" type="password" v-model="editedItem.apikey"></v-text-field>
                    <v-text-field prepend-icon="mdi-keyboard" label="Descripción *" type="text" v-model="editedItem.descripcion"></v-text-field>
                      </v-form>
                    </v-card-text>
            
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialogEdit=false; editCapa(item.idCapa);">Guardar</v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              </template>
            <!-- FIN Editar capa -->

            <!-- Eliminar capa -->
              <template v-slot:item.eliminar="{ item }" >
              <div class="text-xs-center">
                <v-dialog v-model="dialogDelete" width="550">
                  <template v-slot:activator="{ on }">
                  <v-icon color="red" v-on="on">mdi-delete</v-icon>
                  </template>

                  <v-card>
                    <v-card-title class="headline">¿Estás seguro de querer eliminar esta capa?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="white--text" height="60" width="200" color="#B32B2B" @click="dialogDelete=false; eliminarCapa(item.idCapa);">OK</v-btn>
                     
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              </template>
              <!-- FIN Eliminar capa -->
            </v-data-table>
        </v-app>
    </div>
</template>

<script>
import queries from "../logic/queries.js";

export default {
  name: "GestionCapas",
  data(){
      return{
        idUs: null,
        tipo: null,
        dialog: false,
        dialogEdit: false,
        dialogDelete: false,
        nombreLayerNueva: null, descripcionLayerNueva: null, urlLayerNueva: null, apikeyLayerNueva: null,
        loadingvariable: true,
        editedItem: {
            nombre: "",
            descripcion: "",
            apikey: "",
            url: "",
            fk_idUs: null
        },
        list: [],
        headers: [
            { text: 'Nombre', align: 'start', value: 'nombre' },
            { text: 'Descripción', value: 'descripcion'},
            { text: 'URL', value: 'url' },
            { text: 'Apikey', value: 'apikey' },
            { text: 'Editar ', value: 'editar', sortable: false },
            { text: 'Eliminar ', value: 'eliminar', sortable: false },
            ],
      }
  },
  mounted(){
    this.tipo = this.$store.state.tipo;
    this.idUs = this.$store.state.idUs;
    console.log(this.tipo);
    this.obtenerCapas();
  },
  methods: {
      obtenerCapas() {
          this.loadingvariable=true;
          if(this.tipo==1)
          {
              queries.obtenerCapasBase(this.idUs)
                .then((response) => {
                    console.log(response)
                    this.list = response.data;
                    this.getDisplay(this.list);
                    console.log(this.list);
                    this.loadingvariable=false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loadingvariable=false;
                });
          }
          else
          {
              queries.obtenerCapasAdmin()
                .then((response) => {
                    console.log(response)
                    this.list = response.data;
                    console.log(this.list);
                    this.getDisplay(this.list);
                    this.loadingvariable=false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loadingvariable=false;
                });
          }
      },
      getDisplay(list){
          return {
              idCapa: list.idCapa,
              nombre: list.nombre,
              descripcion: list.descripcion,
              url: list.url,
              apikey: list.apikey

          }
      },
      nuevaCapa()
      {
        if (
        this.nombreLayerNueva == null ||
        this.nombreLayerNueva == "" ||
        this.descripcionLayerNueva == null ||
        this.descripcionLayerNueva == "" ||
        this.urlLayerNueva == "" ||
        this.urlLayerNueva == null
        ){
            alert("Menos apikey todos los campos son requeridos");
        } 
        else {
            try 
          {
            
            queries.nuevaCapa(this.nombreLayerNueva, this.descripcionLayerNueva, this.urlLayerNueva, this.apikeyLayerNueva, this.idUs).then(
            response => {
              console.log(response)
              if(response.data.signUp!=false){
                console.log("Capa creada")
                this.obtenerCapas();
                this.nombreLayerNueva=null;
                this.descripcionLayerNueva=null;
                this.urlLayerNueva=null;
                this.apikeyLayerNueva=null;
              }
              else
              {
                alert("Error en la creación");
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
      editItem (item) {
    
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },
    editCapa(idCapa) {
        if (
            this.editedItem.nombre == null ||
            this.editedItem.nombre == "" ||
            this.editedItem.url == null ||
            this.editedItem.url == "" ||
            this.editedItem.descripcion == "" ||
            this.editedItem.descripcion == null 
        ){
            alert("Menos apikey todos los campos son requeridos");
        } 
        else {
          try 
        {
          console.log("idCapa");
          console.log(idCapa);
          queries.editCapa(idCapa, this.editedItem.nombre, this.editedItem.url, this.editedItem.descripcion, this.editedItem.apikey).then(
          response => {
            console.log(response)
            if(response.data.signUp!=false){
              console.log("Capa editada")
              this.obtenerCapas();
            }
            else
            {
              alert("Error al editar la capa");
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
      eliminarCapa(idCapa) {
          queries.eliminarCapa(idCapa)
          .then((response) => {
          this.obtenerCapas();
          console.log(response);
          })
      }
  }
}
</script>
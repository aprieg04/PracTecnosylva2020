import axios from "axios";
const ENDPOINT_PATH = "http://localhost:3000/";

export default {
  solicitudesRegistro() {
    return axios({
      url: ENDPOINT_PATH+"solicitudesRegistro",
      method: "GET"
    })
    .then(response => {
      return response.data;
    });
  },
  denegarSolicitud(idUsuario) {
    const user = { idUsuario };
      return axios({
          url: ENDPOINT_PATH+"denegarSolicitud",
          data: user,
          method: "POST"
      })
      .then(response => {
        return response.data;
      });
  },
  aceptarSolicitud(idUsuario) {
    const user = { idUsuario };
    return axios({
        url: ENDPOINT_PATH+"aceptarSolicitud",
        data: user,
        method: "POST"
    })
    .then(response => {
      return response.data;
    });
},
obtenerUsuarios() {
  return axios({
    url: ENDPOINT_PATH+"obtenerUsuarios",
    method: "GET"
  })
  .then(response => {
    return response.data;
  });
},
getUsuario(id) {
  const user = { id };
  return axios({
    url: ENDPOINT_PATH+"getUsuario",
    data: user,
    method: "POST"
  })
  .then(response => {
    return response.data;
  });
},
editUsuario(id, nombre, email, password, phone, tipo) {
  const user = { id, nombre, email, password, phone, tipo };
  return axios({
    url: ENDPOINT_PATH+"editUsuario",
    data: user,
    method: "POST"
  })
},
editUsuarioPerfil(id, nombre, email, password, phone) {
  const user = { id, nombre, email, password, phone };
  return axios({
    url: ENDPOINT_PATH+"editUsuarioPerfil",
    data: user,
    method: "POST"
  })
},
obtenerCapasBase(id) {
  const user = { id };
  return axios({
    url: ENDPOINT_PATH+"obtenerCapasBase",
    data: user,
    method: "GET"
  })
  .then(response => {
    return response.data;
  });
},
obtenerCapasAdmin() {
  return axios({
    url: ENDPOINT_PATH+"obtenerCapasAdmin",
    method: "GET"
  })
  .then(response => {
    return response.data;
  });
},
nuevaCapa(nombre, descripcion, url, apikey, idUs) {
  const layer = { nombre, descripcion, url, apikey, idUs };
  return axios({
    url: ENDPOINT_PATH+"nuevaCapa",
    data: layer,
    method: "POST"
  })
},
editCapa(id, nombre, url, descripcion, apikey) {
  const user = { id, nombre, url, descripcion, apikey };
  return axios({
    url: ENDPOINT_PATH+"editCapa",
    data: user,
    method: "POST"
  })
},
eliminarCapa(id) {
  const user = { id };
    return axios({
        url: ENDPOINT_PATH+"eliminarCapa",
        data: user,
        method: "POST"
    })
    .then(response => {
      return response.data;
    });
},

};

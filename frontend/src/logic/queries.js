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

};

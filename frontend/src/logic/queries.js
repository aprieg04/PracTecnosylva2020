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
}
};

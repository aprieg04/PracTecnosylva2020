import axios from "axios";

const ENDPOINT_PATH = "http://localhost:3000/";

export default {

  usuarioLogin(nombre, password) {
    const user = { nombre, password };
    return axios({
      url: ENDPOINT_PATH+"login",
      data: user,
      method: "POST"
    })
  }
};

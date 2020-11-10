import axios from "axios";
import Cookies from "js-cookie";
  
const ENDPOINT_PATH = "http://localhost:3000/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  usuarioLogin(nombre, password) {
    const user = { nombre, password };
    return axios({
      url: ENDPOINT_PATH+"login",
      data: user,
      method: "POST"
    })
  },
  usuarioRegistro(nombre, email, password, phone) {
    const user = { nombre, email, password, phone };
    return axios({
      url: ENDPOINT_PATH+"register",
      data: user,
      method: "POST"
    })
  },
};

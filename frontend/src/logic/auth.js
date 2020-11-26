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
    .then(response => {
      if(response.data.accessToken)
      {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  },
  logout() {
    localStorage.removeItem('user');
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Principal from '../views/Principal.vue'
import PrincipalAdmin from '../views/PrincipalAdmin.vue'
import SolicitudesRegistro from '../components/SolicitudesRegistro.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
  {
      path: '/',
      name: 'Home',
      component: Home
  },
  {
      path: '/login',
      name: 'Login',
      component: Login
  },
  {
      path: '/register',
      name: 'Register',
      component: Register
  },
  {
      path: '/principal',
      name: 'Principal',
      component: Principal
  },
  {
    path: '/principalAdmin',
    name: 'PrincipalAdmin',
    component: PrincipalAdmin
  },
  {
    path: '/solicitudesRegistro',
    name: 'SolicitudesRegistro',
    component: SolicitudesRegistro
  }
  ],
  mode: "history"
})


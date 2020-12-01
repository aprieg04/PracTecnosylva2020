import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Principal from '../views/Principal.vue'
import EditarUsuario from '../views/EditarUsuario.vue'
import GestionUsuarios from '../views/GestionUsuarios.vue'
import GestionCapas from '../views/GestionCapas.vue'
import BasePrincipal from '../views/BasePrincipal.vue'
import Error from '../components/Error.vue'


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
      component: Principal,
      props: true,
      children:[
        {
          path: '/',
          component: BasePrincipal
        },
        {
          path: '/principal/gestionUsuarios',
          component: GestionUsuarios,
        },
        {
          path: '/principal/gestionCapas',
          component: GestionCapas,
        },
        {
          path: '/principal/editarUsuario',
          component: EditarUsuario,
        }
      ]
  },
  {
    path: "/error",
    component: Error,
    alias: "404"
  }
  ],
  mode: "history"
})


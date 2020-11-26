import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Principal from '../views/Principal.vue'
import PrincipalAdmin from '../views/PrincipalAdmin.vue'
import EditarUsuario from '../views/EditarUsuario.vue'
import Error from '../views/Error.vue'


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
      path: '/user/:id',
      name: 'Principal',
      component: Principal,
      props: true
  },
  {
    path: '/user/editarUsuario',
    name: 'EditarUsuario',
    component: EditarUsuario
},
  {
    path: '/principalAdmin',
    name: 'PrincipalAdmin',
    component: PrincipalAdmin
},{
  path: "/error",
  component: Error,
  alias: "404"
  
}
  ],
  mode: "history"
})


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import * as VeeValidate from 'vee-validate';
import 'leaflet/dist/leaflet.css'

Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.use(VueResource);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

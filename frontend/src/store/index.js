import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUs: null,
    tipo: null,
  },
  mutations: {
    setIdUs(state, idUs)
    {
      state.idUs = idUs;
    },
    setTipo(state, tipo)
    {
      state.tipo = tipo;
    },
  },
  actions: {
  },
  modules: {
  }
})

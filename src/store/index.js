import Vue from 'vue'
import Vuex from 'vuex'
import commerce from './modules/commerce'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commerce
  }
})

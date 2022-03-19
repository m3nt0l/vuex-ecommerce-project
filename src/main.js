import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import HeaderComp from '@/components/HeaderComp'
import FooterComp from '@/components/FooterComp'
import router from './router'
import store from './store'
import Commerce from '@chec/commerce.js'
import vuetify from './plugins/vuetify'

Vue.component('HeaderComp', HeaderComp)
Vue.component('FooterComp', FooterComp)

const commerce = (typeof process.env.VUE_APP_CHEC_PUBLIC_KEY !== 'undefined')
    ? new Commerce(process.env.VUE_APP_CHEC_PUBLIC_KEY)
    : null;


Vue.prototype.$commerce = commerce // Register your prototype if you need to use it as Vue.prototype.$commerce instead of this (for example when you need to use some rsc from another forlder, ex: views > components)
Vue.mixin({
  beforeCreate() {
    this.$commerce = commerce
  },
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './assets/markdown.css'
import 'jquery'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueLazyload)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

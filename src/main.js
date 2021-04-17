import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Notes from './components/Notes'
import Home from './components/Home'

import './assets/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/patients/:id/notes', name: 'notes', component: Notes },
  { path: '/', name: 'home', component: Home }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

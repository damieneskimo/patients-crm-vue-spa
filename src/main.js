import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Notes from './pages/Notes'
import PatientsList from './pages/PatientsList'
import Login from './pages/Login'

import './assets/index.css';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/patients', name: 'patients', component: PatientsList, props: true },
  { path: '/patients/:id/notes', name: 'notes', component: Notes },
  { path: '/login', name: 'login', component: Login },
  { path: '/', redirect: '/patients' },
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

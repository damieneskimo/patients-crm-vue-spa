import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Notes from './components/Notes'
import PatientsList from './components/PatientsList'
import LoginForm from './components/LoginForm'

import './assets/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/patients', name: 'patients', component: PatientsList, props: true },
  { path: '/patients/:id/notes', name: 'notes', component: Notes },
  { path: '/login', name: 'login', component: LoginForm },
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from './pages/Notes'
import PatientsList from './pages/PatientsList'
import Login from './pages/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/patients', name: 'patients', component: PatientsList, props: true },
  { path: '/patients/:id/notes', name: 'notes', component: Notes, props: true },
  { path: '/login', name: 'login', component: Login },
  { path: '/', redirect: '/patients' },
]

export default new VueRouter({
  mode: 'history',
  routes
})

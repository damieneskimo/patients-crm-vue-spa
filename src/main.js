import Vue from 'vue'
import App from './App.vue'

import router from './router';
import store from './store';

import './assets/index.css';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

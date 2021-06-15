import Vue from 'vue';
import Vuex from 'vuex';
import general from './modules/general';
import patients from './modules/patients';
import notes from './modules/notes';
import auth from './modules/auth';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    general,
    patients,
    notes,
    auth
  },
  strict: debug,
})

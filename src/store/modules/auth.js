import { apiClient } from '@/api'

const state = () => ({
  user: null
})

const getters = {

}

const actions = {
  async login({ dispatch }, { data }) {
    await apiClient.get('/sanctum/csrf-cookie');
    let response = await apiClient.post('/login', data);
    if (response.status === 204) {
      dispatch('getUser')
    }
    return response;
  },
  async logout({ commit }) {
    let response = await apiClient.post('/logout');
    if (response.status == 204) {
      commit('setUser', null)
    }
    return response;
  },
  async getUser({ commit }) {
    let response = await apiClient.get('/api/me');
    if (response.status === 200) {
      commit('setUser', response.data);
    }
    return response;
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

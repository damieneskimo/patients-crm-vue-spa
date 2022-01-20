import { apiClient } from '@/api';

const state = () => ({
    patients: [],
    meta: {
        totalPages: 1,
        total: 0,
        perPage: 0,
        currentPage: 1,
    },
    patient: {}
})

const getters = {
    
}

const actions = {
    async getAllPatients({ commit, dispatch }, queryString) {
      dispatch('general/setIsLoading', {}, {root:true})

      let response = await apiClient.get('/api/patients' + queryString)
      if (response.status === 200) {
        commit('setPatients', response.data.data);
        commit('setMeta', response.data.meta);
      }
      dispatch('general/setIsLoaded', {}, {root:true})
      
      return response;
    },
    async addPatient({ commit }, { data }) {
      let response =  await apiClient({
        method: 'post',
        url: '/api/patients/',
        headers: { 'content-type': 'multipart/form-data' },
        data: data,
      });
      if (response.status == 201) {
        commit('createNewPatient', response.data);
        commit('setPatient', {});
      }
      return response;
    },
    async editPatient({ commit }, { patientId, data }) {
      let response = await apiClient({
          method: 'post',
          url: '/api/patients/' + patientId,
          headers: { 'content-type': 'multipart/form-data' },
          data: data,
        })
        if (response.status == 200) {
          commit('setPatient', response.data);
        }
        return response;
    },
    async getPatient({ commit }, patientId) {
      let response = await apiClient.get('/api/patients/' + patientId)
      if (response.status == 200) {
        commit('setPatient', response.data)
      }
      return response;
    }
}

const mutations = {
    setPatients(state, patients) {
        state.patients = patients;
    },
    setMeta(state, payload) {
        state.meta.total = payload.total;
        state.meta.perPage = payload.per_page;
        state.meta.totalPages = payload.last_page;
        state.meta.currentPage = payload.current_page;
    },
    createNewPatient(state, payload) {
      state.patients.unshift(payload);
    },
    setPatient(state, payload) {
      state.patient = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

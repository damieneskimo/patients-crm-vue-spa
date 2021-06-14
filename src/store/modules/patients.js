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
    getAllPatients({ commit }, queryString) {
      return new Promise((resolve, reject) => {
        apiClient.get('/api/patients' + queryString)
          .then(response => {
            if (response.status === 200) {
              commit('setPatients', response.data.data);
              commit('setMeta', response.data.meta);
              resolve()
            }
          }).catch(error => {
            console.error(error)
            reject(error)
          });
        })
    },
    addPatient({ commit }, {data}) {
      apiClient.post('/api/patients/', data)
        .then(response => {
          if (response.status == 201) {
            commit('createNewPatient', response.data)
          }
        }).catch(error => {
            console.error(error);
        });
    },
    editPatient({ commit }, {patientId, data}) {
      apiClient.put('/api/patients/' + patientId, data)
        .then(response => {
          if (response.status == 200) {
            commit('setPatient', response.data);
          }
        }).catch(error => {
            console.error(error);
        })
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

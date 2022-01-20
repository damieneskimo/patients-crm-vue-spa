import { apiClient } from '@/api'

const state = () => ({
  notes: []
})

const getters = {

}

const actions = {
  async getAllNotes({ commit, dispatch }, patientId) {
    dispatch('general/setIsLoading', {}, {root:true})

    let response = await apiClient.get('/api/patients/' + patientId + '/notes')
    if (response.status == 200) {
        commit('setNotes', response.data)
    }
    dispatch('general/setIsLoaded', {}, {root:true})
    
    return response;
  },
  async addNote({ commit, dispatch }, { patientId, data }) {
    dispatch('general/setIsLoading', {}, {root:true})

    let response = await apiClient.post('/api/patients/' + patientId + '/notes', data)
    if (response.status == 201) {
      commit('createNewNote', response.data)
    }
    dispatch('general/setIsLoaded', {}, {root:true});
    
    return response;
  }
}

const mutations = {
  setNotes(state, payload) {
    state.notes = payload
  },
  createNewNote(state, payload) {
    state.notes.unshift(payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

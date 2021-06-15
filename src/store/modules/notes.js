import { apiClient } from '@/api'

const state = () => ({
    notes: []
})

const getters = {

}

const actions = {
    getAllNotes({ commit, dispatch }, patientId) {
        dispatch('general/setIsLoading', {}, {root:true})

        return new Promise((resolve, reject) => {
            apiClient.get('/api/patients/' + patientId + '/notes')
                .then(response => {
                    if (response.status == 200) {
                        commit('setNotes', response.data)
                        resolve()
                    }
                }).catch(error => {
                    console.error(error);
                    reject(error)
                }).finally(() => {
                    dispatch('general/setIsLoaded', {}, {root:true})
                });
            })
    },
    addNote({ commit, dispatch }, { patientId, data }) {
        dispatch('general/setIsLoading', {}, {root:true})

        return new Promise((resolve, reject) => {
            apiClient.post('/api/patients/' + patientId + '/notes', data)
                .then(response => {
                    if (response.status == 201) {
                        commit('createNewNote', response.data)
                        resolve()
                    }
                }).catch(error => {
                    console.error(error);
                    reject(error)
                }).finally(() => {
                    dispatch('general/setIsLoaded', {}, {root:true})
                });
            })
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

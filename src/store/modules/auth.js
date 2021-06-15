import { apiClient } from '@/api'

const state = () => ({
    user: null
})

const getters = {

}

const actions = {
    login({ dispatch }, { data }) {
        return new Promise((resolve, reject) => {
            apiClient.get('/sanctum/csrf-cookie')
                .then(() => {    
                    apiClient.post('/login', data)
                    .then(response => {
                        if (response.status === 204) {
                            dispatch('getUser')
                            resolve()
                        }
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
            });
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            apiClient.post('/logout').then(response => {
                if (response.status == 204) {
                    commit('setUser', null)
                    resolve();
                }
            }).catch(error => {
                console.error(error);
                reject(error)
            });
        })
    },
    getUser({ commit }) {
        return new Promise((resolve, reject) => {
            apiClient.get('/api/me')
            .then(response => {
                if (response.status === 200) {
                    commit('setUser', response.data)
                    resolve();
                }
            }).catch(error => {
                console.error(error);
                reject(error)
            });
        })
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

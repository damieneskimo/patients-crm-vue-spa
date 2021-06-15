const state = () => ({
    isLoading: false
})

const getters = {

}

const actions = {
    setIsLoading({ commit }) {
        commit('setLoadingStatus', true)
    },
    setIsLoaded({ commit }) {
        commit('setLoadingStatus', false)
    }
}

const mutations = {
    setLoadingStatus(state, payload) {
        state.isLoading = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

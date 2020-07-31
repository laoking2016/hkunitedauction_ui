const state = {
    page: null
}

const getters = {
    page: (state, getters) => {
        return state.page
    }
}

const actions = {
    storePage({commit, state}, page){
        commit('storePage', page)
    }
}

const mutations = {
    storePage(state, page){
        state.page = page
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
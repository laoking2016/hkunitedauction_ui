const state = {
    token: null,
    user: null,
}

const getters = {
    token: (state, getters) => {
        if(state.token != null){
            return state.token    
        }
        return window.localStorage.getItem('token')
    },
    user: (state, getters) => {
        if(state.user != null){
            return state.user    
        }
        return window.localStorage.getItem('user')
    }
}

const actions = {
    storeToken({commit, state}, token){
        commit('storeToken', token)
    },
    storeUser({commit, state}, user){
        commit('storeUser', user)
    }
}

const mutations = {
    storeToken(state, token){
        state.token = token
        window.localStorage.setItem('token', token)
    },
    storeUser(state, user){
        state.user = user
        window.localStorage.setItem('user', user)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
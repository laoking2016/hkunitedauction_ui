const state = {
    catalogs: [],
    q: null,
    mallResult: [],
    auctionResult: []
}

const getters = {
    catalogs: (state, getters) => {
        return state.catalogs
    },
    q: (state, getters) => {
        return state.q
    },
    mallResult: (state, getters) => {
        return state.mallResult
    },
    auctionResult: (state, getters) => {
        return state.auctionResult
    }
}

const actions = {
    storeCatalogs({commit, state}, catalogs){
        commit('storeCatalogs', catalogs)
    },
    storeQ({commit, state}, q){
        commit('storeQ', q)
    },
    storeMallResult({commit, state}, mallResult){
        commit('storeMallResult', mallResult)
    },
    storeAuctionResult({commit, state}, auctionResult){
        commit('storeAuctionResult', auctionResult)
    }
}

const mutations = {
    storeCatalogs(state, catalogs){
        state.catalogs = catalogs
    },
    storeQ(state, q){
        state.q = q
    },
    storeMallResult(state, mallResult){
        state.mallResult = mallResult
    },
    storeAuctionResult(state, auctionResult){
        state.auctionResult = auctionResult
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
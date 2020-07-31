import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import search from './module/search'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    search
  },
  strict: debug,
  plugins: []
})

import Vue from 'vue'
import Vuex from 'vuex'
import product from './module/product'
import lot from './module/lot'
import image from './module/image'
import good from './module/good'
import order from './module/order'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    product,
    lot,
    image,
    good,
    order
  },
  strict: debug,
  plugins: []
})

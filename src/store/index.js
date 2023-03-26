import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate' // 数据持久化插件
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
import member from './modules/member'
import api from '@/api'

export default createStore({
  state: {
    homeData: {}
  },
  getters: {
  },
  mutations: {
    setHomeData (state, data) {
      state.homeData = data
    }
  },
  actions: {
    async getHomeData ({ commit }) {
      const data = await api.getHomeData()
      commit('setHomeData', data)
    }
  },
  modules: {
    user,
    cart,
    category,
    member
  },
  plugins: [
    createPersistedstate({
      key: 'MALL-CLIENT-PC-STORE',
      paths: ['homeData', 'user', 'cart', 'category', 'member']
    })
  ]
})

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
      // 将数据存入本地会话缓存中
      sessionStorage.setItem('HOME-INFO', JSON.stringify(data))
    }
  },
  actions: {
    async getHomeData ({ commit }) {
      let data = null
      // 缓存数据
      const cacheHomeData = JSON.parse(sessionStorage.getItem('HOME-INFO'))
      if (cacheHomeData) {
        data = cacheHomeData
        console.log('使用缓存数据 ==>', data)
      } else {
        data = await api.getHomeData()
        console.log('使用请求返回数据 ==>', data)
      }
      // 传递数据至mutations
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
      paths: ['user', 'cart', 'category', 'member']
    })
  ]
})

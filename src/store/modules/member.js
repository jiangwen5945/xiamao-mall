// 个人中心
import api from '@/api'
export default {
  namespaced: true,
  state: () => {
    return {
      collectList: [],
      footmarkList: []
    }
  },
  getters: {},
  mutations: {
    // 收藏
    setCollectList (state, list) {
      state.collectList = list
    },
    // 足迹
    setFootmarkList (state, list) {
      state.footmarkList = list
    }
  },
  actions: {
    // 获取收藏列表
    findCollect (ctx) {
      console.log('获取收藏列表')
      api.getCollectList().then(res => {
        ctx.commit('setCollectList', res)
      })
    },
    // 添加收藏
    insertCollect (ctx, goods) {
      console.log('添加收藏')
      return new Promise((resolve, reject) => {
        api.addCollect(goods).then(() => api.getCollectList()).then(res => {
          ctx.commit('setCollectList', res)
          resolve()
        })
      })
    },

    // 获取我的足迹列表
    findFootmark (ctx) {
      console.log('获取我的足迹列表')
      api.getFootmark().then(res => {
        ctx.commit('setFootmarkList', res)
      })
    },
    // 添加足迹
    insertFootmark (ctx, goods) {
      console.log('添加足迹')
      return new Promise((resolve, reject) => {
        api.addFootmark(goods).then(() => api.getFootmark()).then(res => {
          ctx.commit('setFootmarkList', res)
          resolve()
        })
      })
    }
  }
}

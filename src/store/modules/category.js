// 分类模块
import api from '@/api'
import { topCategory } from '@/api/constants'
export default {
  namespaced: true,
  state: () => {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setCategoryList (state, list) {
      state.list = list
    }
  },
  actions: {
    async getCategoryList ({ commit }) {
      // 获取数据成功，提交mutations进行数据修改
      const { categoryBanners } = await api.getHomeData()
      commit('setCategoryList', categoryBanners)
    }
  }
}

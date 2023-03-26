// 购物车状态（支持未登录状态添加购物车操作）
import api from '@/api'
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  },
  mutations: {
    // 加入购物车
    insertCart (state, goods) {
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
      // 有相同的给goods累加数量，删除相同skuId的商品
      if (sameIndex >= 0) {
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(goods)
    },
    // 更新购物车商品信息
    updateCart (state, goods) {
      // 根据当前购物车中商品的skuId找到对应的商品信息
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      // goods中字段有可能不完整，goods有的信息才去修改
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车列表
    setCartList (state, list) {
      state.list = list
    }
  },
  actions: {
    // 获取购物车列表
    findCartList (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          api.findCartList().then(res => {
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 更新当前购物车商品的最新信息后返回
          const promiseArr = ctx.state.list.map(item => api.getNewCartGoods(item.skuId))
          Promise.all(promiseArr).then(dataArr => {
            dataArr.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          }).catch(err => {
            reject(err)
          })
        }
      })
    },
    // 添加购物车商品
    insertCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          // 已登录
          // 插入商品后，获取购物车中全部商品列表，并设置购物车列表数据
          api.insertCart(goods).then(() => api.findCartList()).then(res => {
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('insertCart', goods)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart (ctx, goods) {
      // goods 中：必须有skuId，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          api.updateCart(goods).then(() => api.findCartList()).then((res) => {
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 本地
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 修改sku规格函数
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 1. 获取原先商品的数量
          // 2. 删除原先商品
          // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
          // 4. 更新列表
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          api.deleteCart([oldSkuId]).then(() => {
            return api.insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => {
            return api.findCartList()
          }).then(res => {
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2. 删除旧的商品
          ctx.commit('deleteCart', oldSkuId)
          // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 插入即可
          ctx.commit('insertCart', newGoods)
        }
      })
    },
    // 删除购物车商品
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          api.deleteCart(skuId).then(() => api.findCartList()).then(res => {
            // console.log('登录:触发删除购物车商品actions', res)
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 本地
          // console.log('未登录：触发删除购物车商品actions', skuId)
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 批量删除选中商品
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 得到需要删除的商品列表（失效，选中）的skuId集合
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          api.deleteCart(ids).then(() => {
            return api.findCartList()
          }).then(res => {
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 本地
          // 1. 获取选中商品列表，进行遍历调用deleteCart mutataions函数
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选&反选有效商品
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          const ids = ctx.getters.validList.map(item => item.skuId)
          api.checkAllCart({ selected, ids }).then(() => {
            return api.findCartList()
          }).then(res => {
            ctx.commit('setCartList', res)
            resolve()
          })
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 合并本地购物车
    async mergeLocalCart (ctx) {
      // 存储token后调用合并API接口函数进行购物合并
      const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      await api.mergeLocalCart(cartList)
      // 合并成功将本地购物车删除
      ctx.commit('setCartList', [])
    }
  }
}

import http from '../utils/request'
// 获取某个商品最新信息
export const getNewCartGoods = (skuId) => {
  return http({
    url: `/goods/stock/${skuId}`,
    method: 'get',
    data: { skuId },
    isMock: true
  })
}
// 获取当前商品的spec和sku数据
export const getSpecsAndSkus = (skuId) => {
  return http({
    url: `/goods/sku/${skuId}`,
    method: 'get',
    data: { skuId },
    isMock: true
  })
}
// 合并本地购物车
export const mergeLocalCart = (cartList) => {
  return http({
    url: '/member/cart/merge',
    method: 'post',
    data: cartList,
    isMock: true
  })
}
// 获取登录后的购物车列表
export const findCartList = () => {
  return http({
    url: '/member/cart',
    method: 'get',
    data: {},
    isMock: true
  })
}
// 加入购物车
export const insertCart = ({ skuId, count }) => {
  return http({
    url: '/member/cart',
    method: 'post',
    data: { skuId, count },
    isMock: true
  })
}
// 删除商品（支持批量删除）
export const deleteCart = (ids) => {
  return http({
    url: '/member/cart',
    method: 'delete',
    data: { ids },
    isMock: true
  })
}
// 修改购物车商品的状态和数量
export const updateCart = (goods) => {
  return http({
    url: `/member/cart/${goods.skuId}`,
    method: 'put',
    data: goods,
    isMock: true
  })
}
//  全选反选
export const checkAllCart = ({ selected, ids }) => {
  return http({
    url: '/member/cart/selected',
    method: 'put',
    data: { selected, ids },
    isMock: true
  })
}

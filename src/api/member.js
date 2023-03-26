import http from '../utils/request'
// 获取订单列表
export const findOrderList = ({ orderState = 0, page = 1, pageSize = 10 }) => {
  return http({
    url: '/member/order',
    method: 'get',
    data: { orderState, page, pageSize }
  })
}
// 取消订单
export const cancelOrder = (params) => {
  return http({
    url: '/member/order/cancel',
    method: 'get',
    data: params
  })
}
// 删除订单
export const delteOrder = (params) => {
  return http({
    url: '/member/order/delte',
    method: 'get',
    data: params
  })
}
// 提交订单
export const confirmOrder = (params) => {
  return http({
    url: '/member/order/confirm',
    method: 'get',
    data: params
  })
}

// 收藏列表
export const getCollectList = (params) => {
  return http({
    url: '/member/collect',
    method: 'get',
    data: params
  })
}

// 添加收藏
export const addCollect = (params) => {
  return http({
    url: '/member/collect',
    method: 'post',
    data: params
  })
}

// 我的足迹列表
export const getFootmark = (params) => {
  return http({
    url: '/member/footmark',
    method: 'get',
    data: params
  })
}
// 添加足迹
export const addFootmark = (params) => {
  return http({
    url: '/member/footmark',
    method: 'post',
    data: params
  })
}

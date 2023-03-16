import http from '../utils/request'

// 获取结算信息
export const findCheckoutInfo = (params) => {
  return http({
    url: '/member/order/pre',
    method: 'get',
    isMock: true,
    data: params
  })
}
// 添加收货地址信息
export const addAddress = (params) => {
  return http({
    url: '/member/address',
    method: 'post',
    isMock: true,
    data: params
  })
}
// 修改收货地址信息
export const editAddress = (params) => {
  return http({
    url: '/member/address',
    method: 'put',
    isMock: true,
    data: params
  })
}
// 提交订单
export const createOrder = (params) => {
  return http({
    url: '/member/order',
    method: 'post',
    isMock: true,
    data: params
  })
}
// 获取订单详情
export const findOrder = (id) => {
  return http({
    url: `/member/order/${id}`,
    method: 'get',
    isMock: true,
    data: { id }
  })
}
// 查看物流信息
export const logisticsOrder = (id) => {
  return http({
    url: `/member/order/${id}/logistics`,
    method: 'get',
    isMock: true,
    data: { id }
  })
}
// 确认收货
export const confirmOrder = (id) => {
  return http({
    url: `/member/order/${id}/receipt`,
    method: 'put',
    isMock: true,
    data: { id }
  })
}
// 再次购买
export const findOrderRepurchase = ({ id }) => {
  return http({
    url: `/member/order/repurchase/${id}`,
    method: 'get',
    isMock: true,
    data: { id }
  })
}

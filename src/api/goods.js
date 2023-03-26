import http from '../utils/request'
// 获取商品详情
export const getGoodsDetail = (id) => {
  return http({
    url: '/goods',
    method: 'get',
    data: id
  })
}
// 获取商品评论总览
export const getGoodsEvaluate = (id) => {
  return http({
    url: `/goods/${id}/evaluate`,
    method: 'get',
    data: { id }
  })
}
// 获取商品评论列表
export const findCommentListByGoods = (id, params) => {
  return http({
    url: `/goods/${id}/evaluate/page`,
    method: 'get',
    data: { id, ...params }
  })
}
// 获取相关热销商品
export const getGoodsHot = (id) => {
  return http({
    url: '/goods/hot',
    method: 'get',
    data: id
  })
}

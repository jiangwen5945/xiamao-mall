import http from '../utils/request'
// 获取顶级分类的数据
export const findTopCategory = (id) => {
  return http({
    url: '/category',
    method: 'get',
    isMock: true,
    data: { id }
  })
}
// 获取二级分类筛选条件数据
export const findSubCategoryFilter = (id) => {
  return http({
    url: '/category/sub/filter',
    method: 'get',
    isMock: true,
    data: { id }
  })
}
// 获取二级分类的数据（带筛选条件）
export const findSubCategoryGoods = (params) => {
  return http({
    url: '/category/goods/temporary',
    method: 'post',
    isMock: true,
    data: params
  })
}

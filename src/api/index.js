import http from '../utils/request'
import * as orderApi from './order'
import * as categoryApi from './category'
import * as goodsApi from './goods'
import * as cartApi from './cart'
import * as loginApi from './login'
import * as memberApi from './member'
export default {
  // 首页-聚合数据
  getHomeData: (params) => {
    return http({
      url: '/home/index',
      method: 'get',
      isMock: true,
      data: params
    })
  },
  ...orderApi,
  ...categoryApi,
  ...goodsApi,
  ...cartApi,
  ...loginApi,
  ...memberApi
}

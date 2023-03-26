
/** *************** 常量数据 *************** **/
// 顶级分类
import axios from 'axios'
export const topCategory = [
  '居家',
  '美食',
  '服饰',
  '严选',
  '数码',
  '运动'
]
// 订单状态
export const orderStatus = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]
// 取消原因
export const cancelReason = [
  '配送信息有误',
  '商品买错了',
  '重复下单/误下单',
  '忘记使用优惠券、兔币等',
  '其他渠道价格更低',
  '不想买了'
]
// 支付方式
export const payType = ['微信', '支付宝', '银联', '货到付款']

// 城市数据
export const getCityData = (params) => {
  // 这个位置可能有异常操作，封装成promise
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}

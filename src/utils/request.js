import axios from 'axios'
import router from '@/router'
import store from '@/store'
import config from '../config' // 项目环境配置文件

// 网络请求错误的默认提示
const NETWORK_ERROR = '网络请求异常，请稍后重试....'
// 接口Api请求基准地址
const baseURL = './api'

const request = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(config => {
  // 1. 获取用户信息对象(如果本地又token就在头部携带)
  const { profile } = store.state.user
  // 2. 判断是否有token
  if (profile.token) {
    // 3. 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use(response => {
  const { code, result, msg } = response.data // 参数根据后端协商情况
  // 兼容线上响应的参数不同
  const line = code || true
  if (code === '200' || code === 200 || line) {
    return result
  } else {
    return Promise.reject(msg || NETWORK_ERROR)
  }
}, err => {
  // 401 状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    store.commit('user/setUser', {})
    // 2. 跳转到登录页，并传参（当前路由地址）给登录页  ==>(登录成功后跳回该页面)
    // 当前路由地址: js模块中：router.currentRoute.value.fullPath 就是当前路由地址 ==>注：router.currentRoute 是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath) // encodeURIComponent 转换uri编码，防止解析地址出问题
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (option) => {
  // 是否单独配置模拟数据，否则使用统一配置
  const isMock = typeof option.isMock === 'undefined' ? config.isMock : option.isMock
  // 如果是线上环境，强制不使用mock数据,否则根据mock总开关配置而定
  if (config.env === 'production') {
    request.defaults.baseURL = config.baseApi
  } else {
    request.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  // 请求参数
  const requestOption = {
    url: option.url,
    method: option.method,
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY => ['params']:submitData ===== params:submitData
    [option.method.toLowerCase() === 'get' ? 'params' : 'data']: option.data
  }
  return request(requestOption)
}
